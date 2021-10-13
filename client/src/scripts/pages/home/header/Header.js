import React, { useContext } from "react";
import { Grid, Row, Col } from "rsuite";

import LangPairSorter from "src/scripts/pages/home/header/LangPairSorter";

import "src/styles/home/header/Header.scss";

import { HomeContext } from "src/scripts/pages/home/contexts";

function Header() {
    const { update, translate } = useContext(HomeContext);
    
    const capitalize = str => (
        str !== "" ? str[0].toUpperCase() + str.slice(1) : "any language"
    );

    return (
        <header component="header">
            <Grid fluid>
                <Row>
                    <Col>
                        <h1>Immerse Yourself</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>
                            Read and translate real articles in&nbsp;
                            {capitalize(translate.from)} to {capitalize(translate.to)}
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LangPairSorter />
                    </Col>
                </Row>
            </Grid>
        </header>
    )
}

export default Header;
