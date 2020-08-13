const { default: Axios } = require("axios");

const getProductsUrls = async function (url) {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);
    const category = $('.productsListing').each((pos, element) => {
        fs.appendFile(`./csv/productsUrls.csv`, $(element).attr('href') + "," + "\n", (error) => {
            if (error)
                throw error;
        });
    });

}
exports.getProductsUrls = getProductsUrls;