const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const mng = require("../../modules/db-manager/");

const dbPath = path.resolve(__dirname, "../../database/web-translators.db");
const config = [ dbPath, sqlite3.OPEN_READWRITE ];

exports.upload = (req, res) => {
    const db = new sqlite3.Database(...config, err => {
        if (err) { 
            res.status(500).send(`Error connecting: ${err.message}`).end();
        } 
        else {
            console.log("Connection succeed");
        }
    });

    const { user } = req.session;
    const { id, username } = user.public;
    const { key } = user.private;
    const queries = mng.prepare("/upload", req);

    db.serialize(() => {
        db.get(
            `SELECT * FROM Users WHERE UserID = ${id} AND Key = "${key}"`,
            (err, row) => {
                if (err) {
                    return res.status(500).send(`Error making query: ${err.message}`).end();
                }
                else if (!row) {
                    return res.status(401).send(
                        "Error authenticating user credentials. Maybe your session have eneded."
                    ).end();
                }
            }
        );
    
        db.run(...queries[0], err => {
            if (err) {
                return res.status(500).send(`Error making query: ${err.message}`).end();
            }
            else {
                const msg = `${username} (id: ${id}) uploaded a doc - sql: ${query[0]}; params: ${JSON.stringify(query[1])}`
                mng.saveDb(msg);
            }
        });

        db.get(...queries[1], (err, row) => {
            if (err) {
                return res.status(500).send(`Error making query: ${err.message}`).end();
            }
            else {
                if (!row) {
                    return res.status(500).send(`Error making query: ${err.message}`).end();
                } 
                else {
                    const redirectPath = `/doc/${row.DocID}`;
                    res.send(redirectPath);
                }
            }
        });
    });

    db.close(err => {
        if (err) {
            return res.status(500).send(`Error closing connection: ${err.message}`).end();
        } 
        else {
            console.log("Connection closed");
        }
    });
} 