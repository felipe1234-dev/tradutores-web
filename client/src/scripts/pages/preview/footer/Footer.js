import React, { useContext } from "react";
import { Grid, Col, Row } from "rsuite";

import "src/styles/preview/footer/Footer.scss";

import { PreviewContext } from "src/scripts/pages/preview/contexts";

function Footer() {
    const { length, title } = useContext(PreviewContext);

    return (
        <div component="footer">
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={12} md={12}>
                        <div className="title">
                            <p>{title}</p>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                        <div className="length">
                            <p>{length} sentences</p>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default Footer;