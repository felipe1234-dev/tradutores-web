import React, { useState, useEffect, useContext } from "react";

import { useMediaQuery } from "react-responsive";
import { Nav, Content } from "@rsuite/document-nav";
import { Grid, Row, Col, Alert, Loader } from "rsuite";

import BodyGenerator from "src/scripts/global/BodyGenerator/BodyGenerator";
import Translations from "src/scripts/pages/doc/body/translations/Translations";

import "@rsuite/document-nav/lib/less/index.less";
import "src/styles/doc/body/Nav.scss";
import "src/styles/doc/body/Content.scss";

import { DocContext } from "src/scripts/pages/doc/contexts";
import { BodyContext } from "src/scripts/global/BodyGenerator/contexts";

function Body() {
    const { DocID, SourceURL } = useContext(DocContext);

    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState([]);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState({});

    const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

    useEffect(() => {
        const fetchData = () => {
            fetch("/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sourceURL: SourceURL })
            })
            .then(async res => {
                if (res.ok) return res.json(); 
                return res.text().then(err => Promise.reject(err));
            })
            .then(res => setBody(res))
            .catch(err => Alert.error(err));
        }
        
        setLoading(true);
        fetchData();
        setTimeout(() => setLoading(false), 1500);
    }, [SourceURL]);
    
    const getTranslations = snt => {
        setShow(true);
        setSelected(snt);
    }

    const grid = {
        nav: {
            xs: 22, xsOffset: 1,
            sm: 22, smOffset: 1,
            md: 4, mdOffset: 0
        },
        content: {
            xs: 22, xsOffset: 1,
            sm: 22, smOffset: 1,
            md: 18, mdOffset: 1
        }
    }

    const props = {
        nav: {
            minLevel: 1, 
            maxLevel: 6
        },
        translations: {
            onHide: () => setShow(false),
            show: show,
            size: "xs",
            placement: "right",
            backdrop: true,
            DocID: selected
        }
    }

    const providerValue = {
        onClick: getTranslations,
        body: body,
        id: DocID,
        route: "doc"
    }

    if (loading) {
        return (
            <Loader 
                center backdrop
                style={{ position: "absolute", top: "100%" }}  
                content="loading text..." size="md" 
            />
        );
    }
    else {
        return (
            <BodyContext.Provider value={providerValue}>
                <Grid fluid>
                    <Row>
                        {!isMobile && (
                            <Col { ...grid.nav }>
                                {body.length && <Nav { ...props.nav } />}
                            </Col>
                        )}
                        <Col { ...grid.content }>
                            <Content><BodyGenerator /></Content>
                        </Col>
                    </Row>
                </Grid>
                <Translations { ...props.translations } />
            </BodyContext.Provider>
        );
    }
}

export default Body;