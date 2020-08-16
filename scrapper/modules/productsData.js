const getProductsData = async function (url) {
		console.log("Hi");
	const result = await axios.get(url);
	console.log("1");
	const $ = cheerio.load(result.data);
	console.log("2");
	let EAN = $(".product_infos").html().match(/(<\/b>\s:\s[0-9]+<br>)/g);
	let RB = $("#product > div > h2").text().split(" - ");
	let name = $("#product h1").text();
	let description = $("#description").text();
	let price = $(".price").text().replace(/TTC/g, "");
	let image = $(".thumb_pic").attr('src');
	console.log("3");
	let query = `${(RB[0])?RB[0]:$("#product > div > h2").text()},${name},${description},${price},${baseURL + image},${(RB[1]) ? RB[1]: "NaN"},${(EAN[0]) ? EAN[0].replace(/<\/b>\s:\s|<br>/g, ""): "NaN"}`;
	// console.log(query);
	let breadcrumb = $(".breadcrumb li a span").each(function (i, elem){
			console.log("4");
	});
	console.log("5");
	fs.appendFile(`./csv/finalResult.csv`, query + "\n", (error) => {
		if (error)
			throw error;
	});
	console.log("Done");

}
exports.getProductsData = getProductsData;