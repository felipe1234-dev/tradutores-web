import React, { useContext } from "react";
import { BodyContext } from "src/scripts/global/BodyGenerator/contexts";

import Rest from "src/scripts/global/BodyGenerator/html-generators/Rest";
import Image from "src/scripts/global/BodyGenerator/html-generators/Image";
import Sentence from "src/scripts/global/BodyGenerator/html-generators/Sentence";
import Heading from "src/scripts/global/BodyGenerator/html-generators/Heading";
import Table from "src/scripts/global/BodyGenerator/html-generators/Table";
import List from "src/scripts/global/BodyGenerator/html-generators/List";

function BodyGenerator() {
    const { body } = useContext(BodyContext);

    return body.map(item => {
        const props = { item: item, generateSentence: snt => <Sentence snt={snt} /> }

        if (item.tagName === "img") {
            return <Image { ...props } />;
        }
        else if (item.tagName === "table") {
            return <Table { ...props } />;
        }
        else if (["ul", "ol", "dl"].includes(item.tagName)) {
            return <List { ...props } />;
        }
        else if (item.tagName.match(/^h[1-6]$/gi)) {
            return <Heading { ...props } />;
        }
        else {
            return <Rest { ...props } />;
        }
    });
}

export default BodyGenerator;