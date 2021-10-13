import React, { useContext } from "react";
import { Panel } from "rsuite";

import BodyGenerator from "src/scripts/global/BodyGenerator/BodyGenerator";

import { PreviewContext } from "src/scripts/pages/preview/contexts";
import { BodyContext } from "src/scripts/global/BodyGenerator/contexts";

import "src/styles/doc/body/Content.scss";

function Body() {
    const { body } = useContext(PreviewContext);

    const providerValue = {
        body: body,
        route: "preview"
    }

    return (
        <BodyContext.Provider value={providerValue}>
            <Panel>
                <div className="rs-document-nav-content">
                    <BodyGenerator />
                </div>
            </Panel>
        </BodyContext.Provider>
    );
}

export default Body;