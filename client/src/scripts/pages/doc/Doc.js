import React, { useEffect, useState } from "react";
import { Loader, Alert } from "rsuite";

import NotFound from "src/scripts/global/NotFound";
import Layout from "src/scripts/pages/doc/Layout";

import { DocContext } from "src/scripts/pages/doc/contexts";

function Doc() {
    const [loading, setLoading] = useState(true);
    const [doc, setDoc] = useState([]);
    
    useEffect(() => {
        const fetchData = () => {
            const url = window.location.href;
            const id = url.match(/\/doc\/(\d+)/)[1];

            fetch(`/doc/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            .then(async res => {
                if (res.ok) return res.json(); 
                return res.text().then(err => Promise.reject(err));
            })
            .then(res => {
                setDoc(res);
                document.title = `${res.Title} - from ${res.TranslateFrom} to ${res.TranslateTo}`;
            })
            .catch(err => err !== "Not Found!" && Alert.error(err));
        }
        
        fetchData();
        setTimeout(() => setLoading(false), 1500);
    }, []);
    
    const docExists = !!Object.keys(doc).length;
    
    if (loading) {
        return (
            <Loader 
                center
                style={{ position: "absolute", top: "100%" }}  
                content="loading doc..." size="md" 
            />
        );
    }
    else if (!docExists) {
        return (
            <NotFound
                header="404!"
                message="I stole your doc but it looks like you busted me!"
                callToAction="Go to prison"
                icon="pied-piper" size="5x"
            />
        );
    }
    else {
        return (
            <DocContext.Provider value={doc}>
               <Layout />
            </DocContext.Provider>
        );
    }
}

export default Doc;