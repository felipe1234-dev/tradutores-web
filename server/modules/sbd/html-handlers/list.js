const sbd = require("sbd");
const config = require("../config");

const handleList  = (list, $, hS) => {
    let listObject = {
        tagName: $(list).get(0).tagName,
        listItems: []
    };
 
    $(list).children().each(function(i, listItem) {
        const text = $(listItem).html().replace(/\n/g, "").trim() || "no text";
        let sentences = sbd.sentences(text, config);
        
        if (sentences.length) {
            sentences.forEach((snt, j) => {
                sentences[j] = hS(snt);
            });
        }

        listObject.listItems.push({
            tagName: $(listItem).get(0).tagName,
            sentences: sentences
        });
    });

    return listObject;
}

exports.handle = (list, $, handleSentence = () => {}) => handleList(list, $, handleSentence);