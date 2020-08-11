global.axios = require("axios");
global.fs = require("fs");
global.cheerio = require("cheerio");
global.currentWorkingUrls = [];
const { getCategories } = require("./modules/getCategories");
const { subCategories } = require("./modules/subCategories");

const baseURL = "https://www.materielelectrique.com";
getCategories(baseURL).then(() => {
    currentWorkingUrls.forEach(element => {
        subCategories(baseURL + element).then(() => console.log("Success"));
    });

});
