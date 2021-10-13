const text = [
    "b", "strong", "em", "i", "sup", "kbd", 
    "small", "time", "u", "del", "ins", "s", 
    "var", "code", "cite" 
]

const table = [
    "table", "thead", "caption", "tbody", 
    "tfoot", "tr", "th", "td", 
]

const descList = [
    "dl", "dd", "dt"
]

module.exports = {
    newline_boundaries: false,
    html_boundaries: true, // ends sentence if specific tags such as <br> and closing <p> occur
    sanitize: true, // refers to removing other html tags or not 
    allowed_tags: [ ...text, ...table, ...descList ], 
    // if sanitize set to true, only these tags are going to be allowed
    preserve_whitespace: false
}