const getProductsData = async function (url) {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);
    const category = $('.productsListing').each((pos, element) => {
        fs.appendFile(`./csv/finalResult.csv`, $(element).attr('href') + "," + "\n", (error) => {
            if (error)
                throw error;
        });
    });

}
exports.getProductsData = getProductsData;