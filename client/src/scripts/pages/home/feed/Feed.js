import React, { useRef, useState, useEffect, useContext } from "react";
import { PanelGroup, Loader, Alert } from "rsuite";

import useOnScreen from "src/scripts/global/OnScreen";
import Card from "src/scripts/pages/home/feed/Card";
import NoResults from "src/scripts/global/NoResults";

import { HomeContext } from "src/scripts/pages/home/contexts";

function Feed() {
    const { translate, sortBy, filters } = useContext(HomeContext);
    const [visible, position] = useOnScreen({
        selector: "#feed-loader",
        debounce: 1000
    });
    
    const [loading, setLoading] = useState(false);
    const [docs, setDocs] = useState([]);

    const [prevY, setPrevY] = useState(0);

    const fetchDocs = (offset = 0) => {
        fetch("/feed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                translate: JSON.stringify(translate), 
                sortBy: sortBy, 
                filters: JSON.stringify(filters), 
                offset: offset, 
                limit: 5
            })
        })
        .then(async res => {
            if (res.ok) return res.json(); 
            return res.text().then(err => Promise.reject(err));
        })
        .then(res => setDocs(offset > 0 ? docs.concat(res) : res))
        .catch(err => Alert.error(err, 3000))
        .finally(() => setTimeout(() => setLoading(false), 1500));
    }
    
    useEffect(() => {
        setLoading(true);
        fetchDocs();
    }, [JSON.stringify(translate), sortBy, JSON.stringify(filters)]);
    
    useEffect(() => {
        const currY = position.y;
        
        if (currY > prevY) {
            fetchDocs(docs.length);
        }
        
        setPrevY(currY ? currY : 0);
    }, [visible, JSON.stringify(position)]);
    
    if (loading) {
        return (
            <Loader 
                center
                style={{ position: "absolute", top: "100%" }}  
                content="searching..." 
                size="sm" 
            />
        );
    }
    else if (!docs.length) {
        return (
            <NoResults 
                header="We didn't find any results" 
                message="Confirm that everything is spelled correctly or try using other keywords." 
                icon="wpexplorer" 
                size="5x"
            />
        );
    }
    else {
        return (
            <PanelGroup>
                {docs.map((doc, i) => <Card key={i} {...doc} />)}
                <span id="feed-loader"></span>
            </PanelGroup>
        );
    }
} 

export default Feed;
