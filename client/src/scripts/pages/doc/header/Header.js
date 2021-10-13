import React, { useContext } from "react";
import { Col, Row, Grid, Container, Avatar } from "rsuite";
import { Link } from "react-router-dom";

import ProgressBar from "src/scripts/global/ProgressBar";
import Flags from "src/scripts/global/Flags";

import "src/styles/doc/header/Header.scss";

import { DocContext } from "src/scripts/pages/doc/contexts";

function Header() {
    const {
        Done, 
        Total, 
        Username,
        Avatar:avatar, 
        TranslateFrom, 
        TranslateTo,
        SourceURL, 
        UserID 
    } = useContext(DocContext);

    const shortenURL = url => {
        
        if (url) {
            url = url.replace(/http(s)*:\/\//, "");
            url = url.replace(/www\./, "");
            let aux = url.substring(0, 30);
            aux += url.length > 30 ? "..." : "";
            url = aux;
        }

        return url;
    }

    const props = {
        avatar: {
            size: "sm",
            circle: true,
            src: avatar ? `src/media/${avatar}` : ""
        },
        flags: {
            translate: { from: TranslateFrom, to: TranslateTo }
        },
        progressBar: {
            percent: Math.round(Done/Total*100),
            showInfo: false
        },
        linkToSource: {
            target: "_blank",
            rel: "noopener noreferrer",
            href: SourceURL
        }
    }

    return (
        <Container className="top">
            <Grid fluid>
                <Row>
                    <Col xs={18} sm={18} md={8}>
                        <ProgressBar { ...props.progressBar } /> 
                    </Col>
                    
                    <Col xs={4} sm={4} md={3}>
                        <p className="progress">
                            {Done}/{Total}
                        </p>
                    </Col>

                    <Col xs={11} sm={11} md={6}>
                        <p className="source">
                            Link to Source&nbsp;
                            <a { ...props.linkToSource }>
                                {shortenURL(SourceURL)}
                            </a>
                        </p>
                    </Col>
                    
                    <Col xs={10} sm={10} md={5}>
                        <p className="profile">
                            Uploaded by&nbsp;
                            <Avatar { ...props.avatar }>
                                {Username ? Username[0] : ""}
                            </Avatar>&nbsp;
                            <Link to={`/profile/${UserID}`}>
                                {Username}
                            </Link>
                        </p>
                    </Col>
                    
                    <Col xs={1} sm={1} md={1}>
                        <Flags { ...props.flags } />
                    </Col>
                </Row>
            </Grid>
        </Container>
    );
}

export default Header;