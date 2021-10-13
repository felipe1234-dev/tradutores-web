const createProgressQuery = req => {
    const { sntID, docID } = req.query;

    let query = `SELECT * FROM DocTranslations 
    WHERE Doc = ? AND SentenceID = ?
    AND Selected = "true"`;
    query = [ query, [ docID, sntID ] ];

    return query;
}

exports.prepare = req => createProgressQuery(req);