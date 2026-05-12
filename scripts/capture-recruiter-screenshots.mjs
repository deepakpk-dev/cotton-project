import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "assets", "screenshots", "recruiter");
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const DEBUG_PORT = 9333;
const DEBUG_BASE = `http://127.0.0.1:${DEBUG_PORT}`;
const CONSENT_VALUE = JSON.stringify({
  essential: true,
  analytics: true,
  marketing: true,
  updatedAt: new Date().toISOString(),
});

const shots = [
  {
    name: "homepage-desktop",
    url: "http://localhost:8080/",
    width: 1440,
    height: 1100,
    mobile: false,
    scrollY: 0,
  },
  {
    name: "collection-desktop",
    url: "http://localhost:8080/collection/",
    width: 1440,
    height: 1200,
    mobile: false,
    scrollY: 520,
  },
  {
    name: "product-desktop",
    url: "http://localhost:8080/product/",
    width: 1440,
    height: 1200,
    mobile: false,
    scrollY: 180,
  },
  {
    name: "materials-desktop",
    url: "http://localhost:8080/materials/",
    width: 1440,
    height: 1200,
    mobile: false,
    scrollY: 0,
  },
  {
    name: "homepage-mobile",
    url: "http://localhost:8080/",
    width: 430,
    height: 932,
    mobile: true,
    scrollY: 0,
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const withTimeout = (promise, ms, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms),
    ),
  ]);

class CDPClient {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();

    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) {
          pending.reject(new Error(message.error.message));
        } else {
          pending.resolve(message.result);
        }
        return;
      }

      const handlers = this.listeners.get(message.method);
      if (!handlers) return;
      for (const handler of handlers) {
        handler(message.params ?? {});
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  on(method, handler) {
    const handlers = this.listeners.get(method) ?? [];
    handlers.push(handler);
    this.listeners.set(method, handlers);
  }

  once(method) {
    return new Promise((resolve) => {
      const handler = (params) => {
        const handlers = this.listeners.get(method) ?? [];
        this.listeners.set(
          method,
          handlers.filter((candidate) => candidate !== handler),
        );
        resolve(params);
      };
      this.on(method, handler);
    });
  }
}

async function waitForDebugger() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const response = await fetch(`${DEBUG_BASE}/json/version`);
      if (response.ok) {
        return true;
      }
    } catch {
      // Browser not ready yet.
    }
    await sleep(200);
  }
  throw new Error("Edge remote debugger did not start");
}

async function createTab() {
  const response = await fetch(`${DEBUG_BASE}/json/new?${encodeURIComponent("about:blank")}`, {
    method: "PUT",
  });
  if (!response.ok) {
    throw new Error(`Unable to create tab: ${response.status}`);
  }
  return response.json();
}

async function connectToTab(webSocketDebuggerUrl) {
  const ws = new WebSocket(webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  return new CDPClient(ws);
}

async function setViewport(client, shot) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: shot.width,
    height: shot.height,
    deviceScaleFactor: 2,
    mobile: shot.mobile,
    screenWidth: shot.width,
    screenHeight: shot.height,
  });
}

async function navigateAndStabilize(client, url) {
  const loadEvent = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await withTimeout(loadEvent, 15000, `Navigation to ${url}`);
  await sleep(350);
}

async function setConsent(client) {
  await client.send("Runtime.evaluate", {
    expression: `
      localStorage.setItem(
        "tara_cookie_consent",
        ${JSON.stringify(CONSENT_VALUE)}
      );
    `,
  });
}

async function quietAnimations(client) {
  await client.send("Runtime.evaluate", {
    expression: `
      (() => {
        const style = document.createElement("style");
        style.textContent = \`
          *,
          *::before,
          *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        \`;
        document.head.appendChild(style);
      })();
    `,
  });
}

async function scrollTo(client, scrollY) {
  await client.send("Runtime.evaluate", {
    expression: `window.scrollTo(0, ${scrollY});`,
  });
  await sleep(250);
}

async function capture(client, filepath) {
  const { data } = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await writeFile(filepath, Buffer.from(data, "base64"));
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const userDataDir = await mkdtemp(path.join(tmpdir(), "tara-edge-"));

  const edge = spawn(
    EDGE_PATH,
    [
      "--headless=new",
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${userDataDir}`,
      "--hide-scrollbars",
      "--disable-gpu",
      "about:blank",
    ],
    {
      stdio: "ignore",
      detached: false,
    },
  );

  try {
    await waitForDebugger();
    const target = await createTab();
    const client = await connectToTab(target.webSocketDebuggerUrl);

    await client.send("Page.enable");
    await client.send("Runtime.enable");

    for (const shot of shots) {
      console.log(`Capturing ${shot.name}...`);
      await setViewport(client, shot);
      await navigateAndStabilize(client, shot.url);
      await setConsent(client);
      await navigateAndStabilize(client, shot.url);
      await quietAnimations(client);
      await scrollTo(client, shot.scrollY);

      const outputPath = path.join(OUTPUT_DIR, `${shot.name}.png`);
      await capture(client, outputPath);
      console.log(outputPath);
    }

    client.ws.close();
  } finally {
    edge.kill("SIGTERM");
    await sleep(500);
    await rm(userDataDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
