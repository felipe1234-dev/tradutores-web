const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcryptjs");

const ss = require("../../modules/session-setter");
const mng = require("../../modules/db-manager/");

const dbPath = path.resolve(__dirname, "../../database/web-translators.db");
const config = [ dbPath, sqlite3.OPEN_READONLY ];

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const handleLogin = (row, req, res) => {
    const { access, type } = req.body;
    const noResult = !row;
 
    let err;
    let msg;
    let stat;

    if (noResult) {
        const socialMedia = capitalize(type).replace(/ID/g, "");
        
        err = true;
        msg = type === "password" ? "Email or username is incorrect" 
        : `No users associated with this ${socialMedia} account`;
    }
    else {
        const accType = capitalize(type);

        const input = access;
        const hash = row[`Hashed${accType}`];
        
        const accAllowed = bcrypt.compareSync(input, hash);

        if (accAllowed) ss.setSession(row, req);

        err = !accAllowed;
        msg = !accAllowed ? "Password is incorrect" : "Succussfully logged in!";
    }

    stat = err ? 401 : 200;
    
    res.status(stat).send(msg);
}

exports.login = (req, res) => {
    const db = new sqlite3.Database(...config, err => {
        if (err) { 
            res.status(500).send(`Error connecting: ${err.message}`).end();
        } 
        else {
            console.log("Connection succeed");
        }
    });

    db.get(...mng.prepare("/login", req), (err, row) => {
        if (err) {
            res.status(500).send(`Error making query: ${err.message}`).end();
        }
        else {
            handleLogin(row, req, res);
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