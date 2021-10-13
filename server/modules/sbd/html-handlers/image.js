const sbd = require("sbd");
const config = require("../config");

const handleImage = (img, $, hS) => {
    const alt = $(img).attr("alt") || "";
    const src = $(img).attr("src") || $(img).attr("data-src") || "";
    const text = alt.replace(/\n/g, "").trim();

    let sentences = sbd.sentences(text, config);
    if (sentences.length) {
        sentences.forEach((snt, i) => {
            sentences[i] = hS(snt);
        });
    }

    return ({
        tagName: "img",
        src: src,
        alt: alt,
        sentences: sentences
    });
}

exports.handle = (img, $, handleSentence = () => {}) => handleImage(img, $, handleSentence);