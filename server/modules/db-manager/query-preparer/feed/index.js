const createSortingQuery = (sortBy, userID) => {
    let query;

    switch (sortBy) {
        case "Your edits":
            query = `AND (SELECT count(*) FROM DocTranslations AS dt 
                WHERE dt.Doc = d.DocID AND dt.PostedBy = ${userID}) > 0`;
            break;
        case "Your uploads":
            query = `AND d.PostedBy = ${userID}`;
            break; 
    }

    return query;
}

const createProgressQuery = progress => {
    let query = progress.join(" OR ");
    
    query = query.replace("Needs to be translated", "d.Done < d.Total");
    query = query.replace("Needs to be checked"   , "d.Checked < d.Total");
    query = query.replace("Finished"              , "d.Done = d.Total");

    return `AND (${query})`;
}

const createTopicsQuery = topics => {
    let query = "?".repeat(topics.length);

    for (let i = 0; i < topics.length - 1; i++) {
        query = query.replace("??", "?, ?");	
    }
    
    return `AND d.Topic IN (${query})`;
}

const createLevelsQuery = levels => {
    let query = levels.join(" OR ");

    query = query.replace("Easier", "d.Total < (SELECT avg(Total) FROM Docs)*0.40"); 
    query = query.replace("Medium", "(d.Total > (SELECT avg(Total) FROM Docs)*0.40 AND d.Total < (SELECT avg(Total) FROM Docs)*0.60)"); 
    query = query.replace("Harder", "d.Total > (SELECT avg(Total) FROM Docs)*0.60");

    return `AND (${query})`;
}

const createFeedQuery = req => {
    let {
        sortBy,
        filters,
        translate,
        limit, 
        offset
    } = req.body;
    const { loggedIn, user } = req.session;
    
    filters = JSON.parse(filters);
    translate = JSON.parse(translate);
    
    const { progress, levels, topics } = filters;
    
    let query = [ "SELECT d.*, u.Avatar," ];
    let params = [ `%${translate.from}%`, `%${translate.to}%` ];
    
    if (loggedIn) {
        query.push("(CASE WHEN (( SELECT count(*) FROM Upvotes AS u");
        query.push(`WHERE u.UpvotedBy = ${doc.id} AND u.Doc = d.DocID`);
        query.push(`) > 0) THEN "true" ELSE "false" END) AS UserUpvoted,`);
    }
    
    query.push("u.Username FROM Docs AS d");
    query.push("INNER JOIN Users AS u ON d.PostedBy = u.UserID");
    query.push(`WHERE d.TranslateFrom LIKE ?`); 
    query.push(`AND d.TranslateTo LIKE ?`);

    if (["Your edits", "Your uploads"].includes(sortBy)) { 
        query.push(createSortingQuery(sortBy, user.id));
    }
    
    if (progress.length) {
        query.push(createProgressQuery(progress));
    }
    
    if (topics.length) {
        query.push(createTopicsQuery(topics));
        params.push(...topics);
    }

    if (levels.length) {
        query.push(createLevelsQuery(levels));
    }

    if (["CreatedAt", "Upvotes", "LastUpdate"].includes(sortBy)) {
        query.push(`ORDER BY ${sortBy} DESC`);
    }

    query.push(`LIMIT ? OFFSET ?`);
    params.push(limit, offset);

    query = query.join(" ");
    
    console.log([ query, [ ...params ]]);
    return [ query, [ ...params ]];
}

exports.prepare = req => createFeedQuery(req);
