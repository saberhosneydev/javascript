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
			const processed = data.split(',');
			let i = 0;
			let delay = setInterval(()=> {
				let url = processed[i];
				let filterd = url.replace("\n", "");
				currentWorkingUrls.push(filterd);
				if (i >= processed.length) {
					clearInterval(delay);
				}else {
					i +=1;
				}
			}, 2000);
		} else {
			console.log(err);
		}
	});
}
if (process.argv[2] == "--task=data") {
	getProductsData(baseURL + '/prise-prog-mosaic-droite-blanc-p-4560.html')
	// function sleep(ms) {
	// 	return new Promise(resolve => setTimeout(resolve, ms));
	// }
	// global.currentWorkingUrls = new Proxy([], {
	// 	get: function (target, property) {
	// 		return target[property];
	// 	},
	// 	set: function (target, property, value) {
	// 		getProductsData(baseURL + value);
	// 		target[property] = value;
	// 		return true;
	// 	}
	// });
	// fs.readFile('./csv/productsUrls.csv', { encoding: "utf-8" }, function (err, data) {
	// 	if (!err) {
	// 		const processed = data.split(',');
	// 		let i = 0;
	// 		let delay = setInterval(()=> {
	// 			let url = processed[i];
	// 			let filterd = url.replace("\n", "");
	// 			currentWorkingUrls.push(filterd);
	// 			if (i >= processed.length) {
	// 				clearInterval(delay);
	// 			}else {
	// 				i +=1;
	// 			}
	// 		}, 2000);
	// 	} else {
	// 		console.log(err);
	// 	}
	// });
}