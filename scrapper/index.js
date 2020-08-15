global.axios = require("axios");
global.fs = require("fs");
global.cheerio = require("cheerio");
const { getCategories, categoriesSubLinks } = require("./modules/categoriesUrls");
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
if (process.argv[2] == "--task=products") {
    global.currentWorkingUrls = new Proxy([], {
        get: function (target, property) {
            return target[property];
        },
        set: function (target, property, value) {
            getProductsUrls(baseURL + value);
            target[property] = value;
            return true;
        }
    });
    fs.readFile('./csv/urls.csv', { encoding: "utf-8" }, function (err, data) {
        if (!err) {
            const processed = data.split(',');
            processed.forEach(url => {
                let filterd = url.replace("\n", "");
                setTimeout(() => {
                    currentWorkingUrls.push(filterd);
                }, 10000);
            });
        } else {
            console.log(err);
        }
    });

}