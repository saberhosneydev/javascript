global.axios = require("axios");
global.fs = require("fs");
global.cheerio = require("cheerio");
const { getCategories } = require("./modules/getCategories");
const { categoriesSubLinks } = require("./modules/categoriesSubLinks");

const baseURL = "https://www.materielelectrique.com";

global.currentWorkingUrls = new Proxy([], {
    get: function (target, property) {
        return target[property];
    },
    set: function (target, property, value) {
        categoriesSubLinks(baseURL + value);
        target[property] = value;
        return true;
    }
});
if (process.argv0 == "--task=grab") {
    getCategories(baseURL);
}