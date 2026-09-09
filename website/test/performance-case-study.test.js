const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const websiteRoot = path.resolve(__dirname, "..");
const caseStudyPage = path.join(websiteRoot, "dist", "case-study", "index.html");
const eleventyCommand = path.join(websiteRoot, "node_modules", "@11ty", "eleventy", "cmd.cjs");

test("build emits an explicitly illustrative performance marketing case study", () => {
  execFileSync(process.execPath, [eleventyCommand], {
    cwd: websiteRoot,
    stdio: "pipe"
  });

  const html = fs.readFileSync(caseStudyPage, "utf8");

  assert.match(html, /Performance Marketing Case Study/);
  assert.match(html, /Illustrative data only/);
  assert.match(html, /2\.33x/);
});

test("illustrative campaign totals remain internally consistent", () => {
  const caseStudy = require("../src/_data/performanceCaseStudy");

  assert.equal(caseStudy.campaigns.length, 5);
  assert.equal(caseStudy.totals.spend, 12200);
  assert.equal(caseStudy.totals.revenue, 28400);
  assert.equal(caseStudy.totals.purchases, 264);
  assert.equal(caseStudy.totals.roas, "2.33x");
});
