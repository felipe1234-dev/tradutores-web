const createThemeQuery = req => {
    const { public, private } = req.session.user;
    const { id } = public;
    const { key } = private;

    let query = `UPDATE Users SET Theme = ? WHERE UserID = ${id} AND Key = "${key}"`;
    query = [ query, [ req.params.theme ] ]; 

    return query;
}

exports.prepare = req => createThemeQuery(req);