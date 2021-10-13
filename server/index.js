// Installed modules.
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");
const rateLimit = require("express-rate-limit");

// Custom modules.
const rn = require("./modules/rand");

// Routes.
const th = require("./routes/get/theme");

const au = require("./routes/post/auth");
const li = require("./routes/post/login");
const lo = require("./routes/post/logout");
const up = require("./routes/post/upload");
const fd = require("./routes/post/feed");
const sc = require("./routes/post/scrape");

const dc = require("./routes/get/doc");
const pv = require("./routes/get/preview");
const pg = require("./routes/get/progress");

// Vars and Constants.
const PORT = process.env.PORT || 3001;
const inProduction = process.env.NODE_ENV === "production";

const app = express();

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // Start blocking after 3 requests in 1 min
    message: "Error: limit exceeded"
});

const uploadLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1, // Start blocking after 1 request in 1 min
    message: "Error: limit exceeded"
});

// Start.
app.use(helmet()); 
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.set("trust proxy", 1);

app.use(
    session({
        secret: [ rn.randCode(20), rn.randCode(20), rn.randCode(20) ],
        name: rn.randCode(10),
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: inProduction, 
            httpOnly: true,
            sameSite: true,
            maxAge: 3 * 60 * 60 * 1000
        }
    }),
    (req, res, next) => {
        if (typeof req.session.initialised === "undefined") {
            req.session.initialised = true;
            req.session.loggedIn = false;
            req.session.theme = "dark";
            req.session.user = {
                public: {
                    id: null, 
                    username: "",
                    avatar: "", 
                    totalScore: null, 
                    thanks: null, 
                    joinedAt: "", 
                    lastActivity: ""
                },
                private: {
                    key: "", 
                    password: "", 
                    googleID: null, 
                    facebookID: null
                }
            }
        }
        next();
    }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/theme/:theme", (req, res) => {
    if (req.session.loggedIn) {
        th.save(req, res);
    }

    req.session.theme = req.params.theme;
    res.status(200).send("Theme updated");
    
});
app.get("/preview", pv.preview);
app.get("/doc/:id", dc.query);
app.get("/progress", pg.getProgress); // Get sentence progress.

app.post("/auth", au.authenticate);
app.post("/logout", lo.logout);
app.post("/login", loginLimiter, li.login); // Error 429 if we hit this route too often.
app.post("/feed", fd.query);
app.post("/scrape", sc.scrape);
app.post("/upload", uploadLimiter, up.upload);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
