import React, { useContext } from "react";
import { Nav } from "rsuite";

import sorters from "src/scripts/json/sorters";

import "src/styles/home/sorters/Sorters.scss";

import { SessionContext } from "src/scripts/contexts";
import { HomeContext } from "src/scripts/pages/home/contexts";

function Sorters() {
    const { sortBy, setSortBy } = useContext(HomeContext);
    const [session] = useContext(SessionContext);
    const { loggedIn } = session;

    return (
        <Nav
            component="sorters" 
            activeKey={sortBy} 
            onSelect={setSortBy}
        >
            {sorters.filter(
                item => item.mustLogIn === loggedIn || !item.mustLogIn
            ).map((item, i) => (
                <Nav.Item 
                    key={i} 
                    eventKey={item.value}
                >
                    {item.label}
                </Nav.Item>
            ))}
        </Nav>
    );
}

export default Sorters; 
