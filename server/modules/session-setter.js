const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const mng = require("./modules/db-manager/");

const dbPath = path.resolve(__dirname, "../database/web-translators.db");
const config = [ dbPath, sqlite3.OPEN_READONLY ];

exports.setSession = (user, req) => {
    const db = new sqlite3.Database(...config, err => {
        if (err) { 
            res.status(500).send(`Error connecting: ${err.message}`).end();
        } 
        else {
            console.log("Connection succeed");
        }
    });
    
    const {
        Key, 
        HashedPassword, 
        HashedGoogleID, 
        HashedFacebookID, 
        ...rest
    } = user;

    let query = `
        SELECT s."Language", s.Score, count(dt.TransID) 
        AS TotalTranslations, sum(dt.Upvotes) AS TotalUpvotes 
        FROM DocTranslations AS dt INNER JOIN Scores AS s ON dt.PostedBy = 
        s."User" WHERE dt.PostedBy = ? AND (SELECT count(DocID) FROM Docs 
        AS d WHERE dt.Doc = d.DocID AND (d.TranslateFrom = s."Language" 
        OR d.TranslateTo = s."Language")) > 0 GROUP BY s."Language"
    `;
    query = [ query, [rest.UserID]];

    db.all(...query, (err, rows) => {
        if (err) {
            res.status(500).send(`Error making query: ${err.message}`).end();
        }
        else {
            req.session.initialised = true;
            req.session.loggedIn = true;
            req.session.theme = rest.Theme;
            req.session.user = {
                public: {
                    id: rest.UserID, 
                    username: rest.Username,
                    avatar: rest.Avatar, 
                    totalScore: rest.TotalScore, 
                    thanks: rest.Thanks,
                    streak: rest.Streak,
                    joinedAt: rest.JoinedAt, 
                    lastActivity: rest.LastActivity,
                    tiers: rows
                },
                private: {
                    key: Key, 
                    password: HashedPassword, 
                    googleID: HashedGoogleID, 
                    facebookID: HashedFacebookID
                }
            };
        }
    });

    db.close(err => {
        if (err) {
            res.status(500).send(`Error closing connection: ${err.message}`).end();
        } 
        else {
            console.log("Connection closed");
        }
    });
}