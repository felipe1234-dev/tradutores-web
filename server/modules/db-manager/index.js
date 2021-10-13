const sql = require("./query-preparer/");
const dab = require("./save-database/");

module.exports = {
    prepare: (route, req) => sql.prepare(route, req),
    saveDb: (msg, res) => dab.saveDb(msg, res)
}