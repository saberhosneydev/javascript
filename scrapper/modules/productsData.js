const getProductsData = async function (url) {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);
    let MREM = $(".product_infos").html().match(/(<\/b>(.*?)<br>)/g);
    let name = $("#product h1").text();
    let description = $("#description").text();
    let text = $(".price").text().replace(/TTC/g, "");
    let query = `${MREM[1].replace(/<\/b>\s:\s|<br>/g, "")},${name},${description},${price},Images,${MREM[0].replace(/<\/b>\s|<br>/g, "")},${MREM[2].replace(/<\/b>\s|<br>/g, "")},Price,Category,Sub-category,Sub-category`;
        fs.appendFile(`./csv/finalResult.csv`, $(element).attr('href') + "," + "\n", (error) => {
            if (error)
                throw error;
        });

}
exports.getProductsData = getProductsData;