const createDocQuery = req => {
    const { id } = req.params;

    let query = `SELECT d.*, U.UserID, u.Avatar, u.Username FROM Docs AS d 
    INNER JOIN Users AS u ON d.PostedBy = u.UserID WHERE d.DocID = ?`;
    query = [ query, [ id ] ]; 

    return query;
}

exports.prepare = req => createDocQuery(req);