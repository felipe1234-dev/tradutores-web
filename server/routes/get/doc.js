const sqlite3 = require("sqlite3").verbose();

const path = require("path");
const dbPath = path.resolve(__dirname, "../../database/web-translators.db");

const config = [ dbPath, sqlite3.OPEN_READONLY ];

const mng = require("../../modules/db-manager/");

exports.query = (req, res) => {
    const db = new sqlite3.Database(...config, err => {
        if (err) { 
            res.status(500).send(`Error connecting: ${err.message}`).end();
        } 
        else {
            console.log("Connection succeed");
        }
    });

    db.get(...mng.prepare("/doc", req), (err, row) => {
        if (err) {
            res.status(500).send(`Error making query: ${err.message}`).end();
        } 
        else {
            if (row) {
                res.json(row);
            }
            else {
                res.status(404).send("Not Found!");
            }
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