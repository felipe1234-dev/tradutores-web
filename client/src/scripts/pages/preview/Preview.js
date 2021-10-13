import React, { useState, useEffect } from "react";
import { Loader, Alert } from "rsuite";

import Layout from "src/scripts/pages/preview/Layout";

import { PreviewContext } from "src/scripts/pages/preview/contexts";

function Preview() {
    const [loading, setLoading] = useState(true);
    const [doc, setDoc] = useState({
        title: "",
        length: 0,
        body: []
    });

    useEffect(() => {
        const fetchData = () => {
            const url = window.location.href
                .match(/\?url=(.*)/g)
                .join("")
                .replace(/\?url=/g, "");

            fetch(`/preview?url=${url}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            .then(async res => {
                if (res.ok) return res.json(); 
                return res.text().then(err => Promise.reject(err));
            })
            .then(res => setDoc(res))
            .catch(err => Alert.error(err));
        }

        fetchData();
        setTimeout(() => setLoading(false), 2000);
    }, []); 

    if (loading) {
        return (
            <Loader 
                center
                style={{ position: "absolute", top: "100%" }}  
                content="loading preview..." size="sm" 
            />
        );
    }
    else {
        return (
            <PreviewContext.Provider value={doc}>
                <Layout />
            </PreviewContext.Provider>
        );
    }
}

export default Preview;