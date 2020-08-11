const subCategories = async (url) => {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);
    const categoryName = $('#box_categories > h1').text().replace(/\s/g, '');
    const category = $('#box_categories > table > tbody td > a').each((pos, element) => {
        let query = `${pos},${$(element).text().replace(/\s/g, '')},${$(element).attr('href')},${"\n"}`;
        fs.appendFile(`./csv/${categoryName}.csv`, query, (error) => {
            if (error)
                throw error;
        });
        fs.appendFile(`./csv/urls.csv`, $(element).attr('href') + "," + "\n", (error) => {
            if (error)
                throw error;
        });
    });
};
exports.subCategories = subCategories;