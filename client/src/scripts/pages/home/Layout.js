import React, { useContext } from "react";
import { Grid, Row, Col, Affix } from "rsuite";

import Topbar from "src/scripts/pages/home/topbar/Topbar";
import Header from "src/scripts/pages/home/header/Header";
import Tier from "src/scripts/pages/home/tier/Tier";
import Sorters from "src/scripts/pages/home/sorters/Sorters";
import Filters from "src/scripts/pages/home/filters/Filters";
import Feed from "src/scripts/pages/home/feed/Feed";

import { SessionContext } from "src/scripts/contexts";

function Layout() {
    const { loggedIn } = useContext(SessionContext);

    const grid = {
        header: {
            xs: 22, xsOffset: 1,
            sm: 22, smOffset: 1,
            md: 22, mdOffset: 1
        },
        tier: {
            xs: 22, xsOffset: 1,
            sm: 22, smOffset: 1,
            md: 20, mdOffset: 2
        },
        sorters: {
            xs: 22, xsOffset: 1,
            sm: 22, smOffset: 1,
            md: 20, mdOffset: 2
        },
        filters: {
            xs: 22, xsOffset: 1,
            sm: 22, smOffset: 1,
            md: 8,  mdOffset: 2
        },
        feed: {
            xs: 22, xsOffset: 1,
            sm: 22, smOffset: 1,
            md: 12, mdOffset: 0
        }
    }

    return (
        <>
            <Affix>
                <Topbar />
            </Affix>
            <Grid fluid>
                <Row>
                    <Col { ...grid.header }>
                        <Header />
                    </Col>
                </Row>
                {loggedIn && (
                    <Row>
                        <Col { ...grid.tier }>
                            <Tier />
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col { ...grid.sorters }>
                        <Sorters />
                    </Col>
                </Row>
                <Row>
                    <Col { ...grid.filters }>
                        <Filters />
                    </Col>
                    <Col { ...grid.feed }>
                        <Feed />
                    </Col>
                </Row>
            </Grid>
        </>
    );
}

export default Layout;