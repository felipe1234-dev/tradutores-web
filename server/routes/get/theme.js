const sqlite3 = require("sqlite3").verbose();

const path = require("path");
const dbPath = path.resolve(__dirname, "../../database/web-translators.db");

const config = [ dbPath, sqlite3.OPEN_READWRITE ];

const mng = require("../../modules/db-manager/");

exports.save = (req, res) => {
    const db = new sqlite3.Database(...config, err => {
        if (err) { 
            res.status(500).send(`Error connecting: ${err.message}`).end();
        } 
        else {
            console.log("Connection succeed");
        }
    });

    const query = mng.prepare("/theme", req);
    const { user } = req.session;
    const { id, username } = user.public;
    const { key } = user.private;

    db.serialize(() => {
        db.get(
            `SELECT * FROM Users WHERE UserID = ${id} AND Key = "${key}"`,
            (err, row) => {
                if (err) {
                    res.status(500).send(`Error making query: ${err.message}`).end();
                }
                else if (!row) {
                    res.status(401).send(
                        "Error authenticating user credentials. Maybe you've tried something you shouldn't do?"
                    ).end();
                }
            }
        );

        db.run(...query, err => {
            if (err) {
                res.status(500).send(`Error making query: ${err.message}`).end();       
            }
            else {
                const msg = `${username} (id: ${id}) updated their theme - sql: ${query[0]}; params: ${JSON.stringify(query[1])}`
                mng.saveDb(msg);
            }
        });
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