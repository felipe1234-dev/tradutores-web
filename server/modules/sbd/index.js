const cheerio = require("cheerio");
const axios = require("axios");

const rest = require("./html-handlers/rest");
const list = require("./html-handlers/list");
const table = require("./html-handlers/table");
const image = require("./html-handlers/image");

const fetchHTML = async url => {
    try {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    } catch (err) {
        console.error(`Error fetching URL : ${err.message}`);
    }
}
 
const parents = [
    "h1", "h2", "h3", "h4", "h5", "h6", "p",
    "table", "dl", "ul", "ol", "img", "blockquote"
];

let counter;

const handleSentence = html => {

    counter++;
    
    return ({
        ID: counter,
        innerHTML: html,
        innerText: html.replace(/(<([^>]+)>)/ig, "")
    });
};

exports.splitSentences = async sourceURL => {
    const $ = await fetchHTML(sourceURL);

    $("*").each(function(i, elem) {
        const notAnImg = $(elem).get(0).tagName !== "img";
        if (notAnImg) {
            $(elem).attribs = {};
        }
    });

    const title = $("head > title").text().replace(/\n/g, "").trim();

    let body = [];
    counter = 0;
    
    $(parents.join(", ")).each(function(i, elem) {
        const tagName = $(elem).get(0).tagName;
        let object; 

        if (tagName === "img") {
            object = image.handle(elem, $, handleSentence);
        }
        else if (tagName === "table") {
            object = table.handle(elem, $, handleSentence);
        }
        else if (["ul", "ol", "dl"].includes(tagName)) {
            object = list.handle(elem, $, handleSentence);
        }
        else {
            object = rest.handle(elem, $, handleSentence);
        }

        body.push(object);
    });

    return ({
        length: counter,
        title: title,
        body: body
    });
}