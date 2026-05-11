module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"css": "css"});
  eleventyConfig.addPassthroughCopy({"js": "js"});
  eleventyConfig.addPassthroughCopy({"images": "images"});

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
      includes: "_includes"
    }
  };
};
