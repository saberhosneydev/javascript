const categoriesSubLinks = async (url) => {
    const result = await axios.get(url);
    const $ = cheerio.load(result.data);
    const category = $('#box_categories > table > tbody td > a').each((pos, element) => {
        fs.appendFile(`./csv/urls.csv`, $(element).attr('href') + "," + "\n", (error) => {
            if (error)
                throw error;
        });
        currentWorkingUrls.push($(element).attr('href'));
    });
};
exports.categoriesSubLinks = categoriesSubLinks;