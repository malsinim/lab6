//  modules to delete dist folder 
const fs = require("fs");
const path = require("path"); 

module.exports = function(eleventyConfig) {

    eleventyConfig.on("eleventy.before", async ({ dir }) => {
		// Run me before the build starts
    // referenced https://www.geeksforgeeks.org/node-js-process-cwd-method/
    const distPath = path.join(process.cwd(), dir.output);
        // referenced https://www.geeksforgeeks.org/node-js-fs-rmsync-method/
        // check to see if the dist folder exists to delete it 
        if (fs.existsSync(distPath)) {
            // delete dist folder using rmSync by prividing path to folder and recursive set to true to delete all contents of dist folder
            fs.rmSync(distPath, { recursive: true});
            console.log('Deleted dist folder');
        } else {
            console.log('No dist folder to delete');
        }
    
    });
    eleventyConfig.setTemplateFormats(["md","liquid"]);
    eleventyConfig.addPassthroughCopy("src/public");
    eleventyConfig.addWatchTarget("src/public/css");
    require('dotenv').config();
    
    // Return your Object options:
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    }
  };