module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"css": "css"});
  eleventyConfig.addPassthroughCopy({"js": "js"});

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
      includes: "_includes"
    }
  };
};
