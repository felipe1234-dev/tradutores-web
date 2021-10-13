const createUploadQueries = req => {
    const { title, source, topic, docLang, targetLang, length } = req.body;
    const { user } = req.session;
    const { id } = user.public;

    let query1 = [];
    
    query1.push("INSERT INTO Docs"); 
    query1.push("(Title, SourceURL, Topic, TranslateFrom, TranslateTo, PostedBy, Total)");
    query1.push(`VALUES (?, ?, ?, ?, ?, ${id}, ?)`);
    
    query1 = query1.join(" ");
    query1 = [ query1, [title, source, topic, docLang, targetLang, length]];

    let query2 = [];

    query2.push(`SELECT DocID FROM Docs WHERE PostedBy = ${id} AND`);
    query2.push("Title = ? AND SourceURL = ? AND Topic = ? AND");
    query2.push("TranslateFrom = ? AND TranslateTo = ? AND Total = ?");

    query2.join(" ");
    query2 = [ query2, [title, source, topic, docLang, targetLang, length]];

    return [ query1, query2 ];
}

exports.prepare = req => createUploadQueries(req);