const pluginTailwindCSS = require("eleventy-plugin-tailwindcss")
const navigation = require("@11ty/eleventy-navigation")
const seo = require("eleventy-plugin-seo")
const unpkgInliner = require("eleventy-njk-unpkg-inliner")
const site = require("./src/_data/site.js")
const shopify = require("eleventy-plugin-shopify")
require("dotenv").config()
const { SHOPIFY_STORE_URL, SHOPIFY_ACCESS_TOKEN, SHOPIFY_API_VERSION } = process.env

module.exports = function(eleventyConfig) {

    // TEMPLATES
    eleventyConfig.addLayoutAlias('default', 'layouts/base.njk')
    
    // PLUGINS
eleventyConfig.addPlugin(shopify, {
    url: '',
    key: '',
    version: '',
})

    eleventyConfig.addPlugin(pluginTailwindCSS, {
        src: "src/css/style.css"
    })
    
    eleventyConfig.addPlugin(navigation);

    eleventyConfig.addPlugin(seo, {
        title: site.title,
        description: site.description,
        url: site.url,
        author: site.author.name,
        twitter: site.author.twitter,
        image: site.image
      })
    
    // SHORTCODES
    eleventyConfig.addNunjucksAsyncShortcode('inline', unpkgInliner)

    // DEEP DATA MERGE
    eleventyConfig.setDataDeepMerge(true)

    return {
        dir: {
            input: 'src',
            output: 'dist'
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk'

    }

}
