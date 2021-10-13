import React, { useState, useEffect } from "react";

import Languages from "src/scripts/json/languages";

import "src/styles/global/flags/Flags.scss";

function Flags({ translate }) {
    const [imgs, setImgs] = useState({});
    
    useEffect(() => {
        let tmp = {}; 

        Languages.forEach(lang => {
            tmp[`${lang.label}`] = lang.src;
        });

        setImgs(tmp);
    }, []);
    
    const props = {
        transFrom: {
            className: "flag-from",
            style: { 
                backgroundImage: `url("${imgs[translate.from]}")` 
            }
        },
        transTo: {
            className: "flag-to",
            style: { 
                backgroundImage: `url("${imgs[translate.to]}")` 
            }
        }
    }

    return (
        <span { ...props.transFrom }>
            <span { ...props.transTo }></span>
        </span>
    );
}

export default Flags;