const li = require("./login/");
const fd = require("./feed/");
const pg = require("./progress/");
const dc = require("./doc/");
const th = require("./theme/");
const up = require("./upload/");

exports.prepare = (route, req) => {
    switch(route) {
        case "/login": 
            return li.prepare(req);
        case "/feed":
            return fd.prepare(req);
        case "/progress": 
            return pg.prepare(req);
        case "/doc": 
            return dc.prepare(req);
        case "/theme": 
            return th.prepare(req);
        case "/upload": 
            return up.prepare(req);
    }
}