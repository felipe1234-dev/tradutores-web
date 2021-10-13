const createLoginQuery = req => {
    const { type } = req.body;
    let query;

    switch (type) {
        case "facebookID":
        case "googleID":
            query = `SELECT * FROM Users WHERE Email = ?`;
            query = [ query, [req.body.email] ]; 
            break;
        case "password":
            query = `SELECT * FROM Users WHERE Username = ? AND Email = ?`;
            query = [ query, [req.body.username, req.body.email] ]; 
            break;
    }

    return query;
}

exports.prepare = req => createLoginQuery(req);