import React from "react";
import {
    Affix, 
    Grid, 
    Row, 
    Col
} from "rsuite";

import Header from "src/scripts/pages/doc/header/Header";
import Body from "src/scripts/pages/doc/body/Body";

import "src/styles/doc/grid/Grid.scss";

function Layout() {

    const grid = {
        header: {
            xs: 22, xsOffset: 1,
            sm: 22, smOffset: 1,
            md: 22, mdOffset: 1
        },
        body: {
            xs: 22, xsOffset: 1,
            sm: 22, smOffset: 1,
            md: 22, mdOffset: 1
        }
    }

    return (
        <Grid fluid>
            <Row>
                <Col { ...grid.header }>
                    <Affix>
                        <Header />
                    </Affix>
                </Col>
            </Row>
            <Row>
                <Col { ...grid.body }>
                    <Body />
                </Col>
            </Row>
        </Grid>
    );
}

export default Layout;