global.axios = require("axios");
global.fs = require("fs");
global.cheerio = require("cheerio");
const { getCategories,categoriesSubLinks } = require("./modules/categoriesUrls");
const { getProductsUrls } = require("./modules/productsUrls");
const baseURL = "https://www.materielelectrique.com";

if (process.argv[2] == "--task=categories") {
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
    getCategories(baseURL);
}
if(process.argv[2] == "--task=products"){
    getProductsUrls(baseURL + '/finition-bois-tabac-c-100073_100673_100682_100694_100715_100716_100719.html');
}