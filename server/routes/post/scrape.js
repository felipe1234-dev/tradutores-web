const ws = require("../../modules/sbd/index");
            
exports.scrape = async (req, res) => {
    const { sourceURL } = req.body;     
    const doc = await ws.splitSentences(sourceURL);    

    res.json(doc.body);
}