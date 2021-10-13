const sbd = require("sbd");
const config = require("../config");

const handleTable = (table, $, hS) => {
    let tableObject = {
        tagName: "table",
        tableRows: []
    };  

    $(table).find("tr").each(function(i, tableRow) {

        let sentences;
        let rowItems = [];

        $(tableRow).children().each(function(j, rowItem) {
            const text = $(rowItem).html().replace(/\n/g, "").trim() || "";
            sentences = sbd.sentences(text, config);

            if (sentences.length) {
                sentences.forEach((snt, k) => {
                    sentences[k] = hS(snt);
                });
            }

            rowItems.push({
                tagName: $(rowItem).get(0).tagName,
                sentences: sentences
            });
        });

        tableObject.tableRows.push({
            rowItems: rowItems
        });

    });

    return tableObject;
}

exports.handle = () => handleTable();