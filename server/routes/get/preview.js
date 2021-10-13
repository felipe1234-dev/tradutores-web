const ws = require("../../modules/sbd/index");

exports.preview = async (req, res) => {
    const { url } = req.query;     
    const doc = await ws.splitSentences(url);

    res.json(doc);
}