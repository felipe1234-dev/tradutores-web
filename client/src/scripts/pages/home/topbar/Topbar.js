import React from "react";

import { Navbar } from "rsuite";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import WideScreenNav from "src/scripts/pages/home/topbar/wide-screen/WideScreenNav";
import SmallScreenNav from "src/scripts/pages/home/topbar/small-screen/SmallScreenNav";

import "src/styles/home/topbar/Topbar.scss";

function Topbar() {
    const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

    return (
        <Navbar component="topbar">
            <Navbar.Header>
                <Link to="/" className="navbar-brand logo">
                    WEB TRANSLATORS
                </Link>
            </Navbar.Header>
            <Navbar.Body>
                {isMobile ? <SmallScreenNav /> : <WideScreenNav />}
            </Navbar.Body>
        </Navbar>
    );
}

export default Topbar;