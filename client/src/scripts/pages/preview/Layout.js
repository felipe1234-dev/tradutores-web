import React from "react";
import { Grid, Row, Col } from "rsuite";

import Body from "src/scripts/pages/preview/body/Body";
import Footer from "src/scripts/pages/preview/footer/Footer";

import "src/styles/preview/footer/Footer.scss";

function Layout() {
    return (
        <>
            <Body />
            <Footer />
        </>
    );
}

export default Layout;