global.baseURL = "https://www.materielelectrique.com";
global.axios = require("axios");
global.fs = require("fs");
global.cheerio = require("cheerio");
const { getProductsData } = require("./modules/productsData");

getProductsData(baseURL + '/prise-de-courant-multi-standard-livinglight-2p-t-anthracite-2-modules-p-207119.html');