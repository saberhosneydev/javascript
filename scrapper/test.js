global.cheerio = require("cheerio");

const $ = cheerio.load(`<div class="clear_both product_infos">
                        <b>Marque :</b> Golmar Bitron Video<br>
            <b>Référence :</b> UAV1407/010<br>

    <b>EAN</b> : 8023874017082<br>

            <b>Minimum de commande</b> : 1<br>


                    <div class="favoriteButton"></div>

                    <span class="chevron"> &gt; </span>&nbsp;<a href="/combine-interphone-universel-fils-p-12037.html#anchor_desc" class="detail">Voir plus de détails</a><br>
                                            <span class="chevron"> &gt; </span>&nbsp;<a href="http://www.evicom-doc.fr/Produit/Doc/Doc_UAV1407_010_1.pdf" target="_blank" class="detail">Fiche E-Catalogue</a><br>

                                    </div>`);
	let text = $(".product_infos").html().match(/(<\/b>(.*?)<br>)/g);
	console.log(text[2].replace(/<\/b>\s:\s|<br>/g, ""));
