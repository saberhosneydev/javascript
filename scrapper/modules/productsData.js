const getProductsData = async function (url) {
	const result = await axios.get(url);
	const $ = cheerio.load(result.data);
	let EAN = $(".product_infos").html().match(/(<\/b>\s:\s[0-9]+<br>)/g);
	let RB = $("#product > div > h2").text().split(" - ");
	let name = $("#product h1").text();
	let description = $("#description").text();
	let price = $(".price").text().replace(/TTC/g, "");
	let image = $(".thumb_pic").attr('src');
	let query = `"${(RB[0])?RB[0]:$("#product > div > h2").text()}","${name}","${description}","${price}","${baseURL + image}","${(RB[1]) ? RB[1]: "NaN"}","${(EAN[0]) ? EAN[0].replace(/<\/b>\s:\s|<br>/g, ""): "NaN"}"`;
	let breadcrumb = $("#wrapper-breadcrumb .breadcrumb li a span").each(function (i, elem){
			query += `,"${$(this).text()}"`;
	});
	fs.appendFile(`./csv/finalResult.csv`, query + "\n", (error) => {
		if (error)
			throw error;
	});
}
exports.getProductsData = getProductsData;