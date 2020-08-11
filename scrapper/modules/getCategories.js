const getCategories = async (url) => {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);
    const category = $('.sousmenu > .menu').each((pos, element) => {
        let query = `${pos},${$(element).text().replace(/\s/g, '')},${$(element).attr('href')},${"\n"}`;
        fs.appendFile('./csv/categories.csv', query, (error) => {
            if (error)
                throw error;
        });
        fs.appendFile(`./csv/urls.csv`, $(element).attr('href') + "," + "\n", (error) => {
            if (error)
                throw error;
        });
        currentWorkingUrls.push($(element).attr('href'));
    });
};
exports.getCategories = getCategories;
