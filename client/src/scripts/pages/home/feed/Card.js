import React from "react";
import { Panel } from "rsuite";
import { Link } from "react-router-dom";

import Header from "src/scripts/pages/home/feed/card/Header";
import Info from "src/scripts/pages/home/feed/card/Info";

import "src/styles/home/card/Card.scss";


function Card({ key, DocID: id, Topic, Title, ...rest }) {
    return (
        <Panel component="card" key={key} shaded>
            <div className="card">
                <div className="card-content">
                    <Header {...rest} />

                    <h4 className="card-title">
                        <div className="rs-tag" title={Topic}>
                            {Topic}
                        </div>&nbsp;
                        <Link to={`/doc/${id}`}>
                            <b>{Title}</b>
                        </Link>
                    </h4>
                    
                    <Info {...rest} />
                </div>
            </div>
        </Panel>
    );
}

export default Card;