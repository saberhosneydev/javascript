global.axios = require("axios");
global.fs = require("fs");
global.cheerio = require("cheerio");
const { getCategories, categoriesSubLinks } = require("./modules/categoriesUrls");
const { getProductsUrls } = require("./modules/productsUrls");
const { getProductsData } = require("./modules/productsData");
global.baseURL = "https://www.materielelectrique.com";

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
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}


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
			let processed = data.split(',');
			let i = 0;
			processed.pop();
			let delay = setInterval(() => {
				let url = processed[i];
				let filterd;
				if (url.includes("\n")) {
					filterd = url.replace("\n", "");
				} else {
					filterd = url;
				}
				currentWorkingUrls.push(filterd);
				if (i >= processed.length) {

					clearInterval(delay);
				} else {
					i += 1;
				}
			}, 2000);
		} else {
			console.log(err);
		}
	});
}
if (process.argv[2] == "--task=processUrls") {
	fs.readFile('./csv/productsUrls.csv', { encoding: "utf-8" }, function (err, data) {
		if (!err) {
			let processed = data.split(',');
			processed.pop();
			let query = "";
			processed.forEach((url, index) => {
				url = url.replace("\n", "");
				if (index == (processed.length - 1)) {
					query += url;
				} else {
					query += url + ",";
				}

			});
			fs.appendFile("./csv/processed.csv", query, function (err) {
				if (err) throw err;
			});
		} else {
			console.log(err);
		}
	});

}
if (process.argv[2] == "--task=obtainData") {
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async function processUrl(index, arr) {
		await getProductsData(baseURL + arr[index]).then(() => {
			if (index == (arr.length - 1)) {
				return true;
			} else {
				processUrl(index++, arr);
			}
		});
	}
	fs.readFile('./csv/processed.csv', { encoding: "utf-8" }, function (err, data) {
		if (!err) {
			let processed = data.split(",");
			processUrl(0, processed);
		} else {
			console.log(err);
		}
	});
}