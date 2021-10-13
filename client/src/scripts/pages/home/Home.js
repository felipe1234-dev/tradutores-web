import React, { useState } from "react";
import Layout from "src/scripts/pages/home/Layout";
import useForceUpdate from "src/scripts/global/ForceUpdate";

import { HomeContext } from "src/scripts/pages/home/contexts";

function Home() {
    const [, forceUpdate] = useForceUpdate();
    
    // Header.
    const [translate, setTranslate] = useState({ 
        from: "", 
        to: "" 
    });

    // Sorters.
    const [sortBy, setSortBy] = useState("CreatedAt");
    
    // Filters.
    const [filters, setFilters] = useState({
        progress: [], 
        levels: [],
        topics: []
    });

    const providerValue = {
        update: forceUpdate,
        
        translate: translate,
        setTranslate: setTranslate,
        
        sortBy: sortBy,
        setSortBy: setSortBy,
        
        filters: filters,
        setFilters: setFilters
    };

    return (
        <HomeContext.Provider value={providerValue}>
            <Layout />
        </HomeContext.Provider>
    );
}

export default Home;
