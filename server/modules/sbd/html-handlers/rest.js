const sbd = require("sbd");
const config = require("../config");

const handleRest  = (tag, $, hS) => {
    const text = $(tag).html().replace(/\n/g, "").trim() || "";
    let sentences = sbd.sentences(text, config);
    
    if (sentences.length) {
        sentences.forEach((snt, i) => {
            sentences[i] = hS(snt);
        }); 
    }     

    return ({
        tagName: $(tag).get(0).tagName,
        sentences: sentences
    });
}

exports.handle = (tag, $, handleSentence = () => {}) => handleRest(tag, $, handleSentence);