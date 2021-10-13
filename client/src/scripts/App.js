import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch, 
    Route
} from "react-router-dom";
import { Alert, Loader } from "rsuite";

import Home from "src/scripts/pages/home/Home";
import Doc from "src/scripts/pages/doc/Doc";
import Preview from "src/scripts/pages/preview/Preview";

import { ThemeContext, SessionContext } from "src/scripts/contexts";

function App() {
    const [session, setSession] = useState({
        loggedIn: false,
        user: {
            id: null, 
            username: "",
            avatar: "", 
            totalScore: null, 
            thanks: null, 
            joinedAt: "", 
            lastActivity: ""
        }
    });
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const auth = () => {
            fetch("/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            .then(async res => {
                if (res.ok) return res.json(); 
                return res.text().then(err => Promise.reject(err));
            })
            .then(res => {
                setSession({ loggedIn: res.loggedIn, user: res.user });
                setTheme(res.theme);
            })
            .catch(err => Alert.error(err, 3000));
        }

        setContent("loading session...");
        auth();
        setTimeout(() => setLoading(false), 1500);
    }, []);

    useEffect(() => {
        const toggleTheme = () => {
            const fileName = theme === "light" ? "default" : "dark";
            const prevLink = document.querySelector('link[rel="stylesheet"]#theme');
            const createElem = prevLink == null;
            
            const root = document.querySelector("#root");
            let link;

            if (createElem) {
                link = document.createElement("link");
            } 
            else {
                link = prevLink;
            }

            link.id = "theme";
            link.rel = "stylesheet";
            link.href = `https://cdnjs.cloudflare.com/ajax/libs/rsuite/4.0.2/styles/rsuite-${fileName}.min.css`;

            root.dataset.theme = theme;

            if (createElem) {
                document.getElementsByTagName("head")[0].appendChild(link);
            }
        }

        const saveTheme = () => {
            fetch(`/theme/${theme}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            .then(async res => {
                if (res.ok) return res.text(); 
                else return res.text().then(err => Promise.reject(err));
            })
            .catch(err => Alert.error(err));
        }
        
        setLoading(true);
        setContent("loading theme...");

        toggleTheme();
        saveTheme();
        
        setTimeout(() => setLoading(false), 1500);
    }, [theme]);

    if (loading) {
        return (
            <Loader 
                center
                style={{ position: "absolute", top: "100%" }}  
                content={content} size="sm" 
            />
        );
    }
    else {
        return (
            <ThemeContext.Provider value={[theme, setTheme]}>
                <SessionContext.Provider value={[session, setSession]}>
                    <Router>
                        <Switch>
                            <Route path="/preview">
                                <Preview />
                            </Route>
                            <Route path="/doc">
                                <Doc />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Router>
                </SessionContext.Provider>
            </ThemeContext.Provider>
        );
    }
}

export default App;