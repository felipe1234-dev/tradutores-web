import React, { useState, useEffect, useContext } from "react";
import {
    Form,
    SelectPicker, 
    ControlLabel,
    FormGroup
} from "rsuite";

import languages from "src/scripts/json/languages";

import { HomeContext } from "src/scripts/pages/home/contexts";

function LangPairSorter() {
    const { update, translate, setTranslate } = useContext(HomeContext);
    const [langs, setLangs] = useState({ from: [], to: [] });
    
    useEffect(() => {
            console.log("test");
            let temp = [];
    
            temp = languages.filter(lang => (
                (lang.label === "---") || 
                (translate.from !== lang.label && translate.to !== lang.label)
            ));
            
            setLangs({ from: temp, to: temp });
        }, 
        [JSON.stringify(translate)]
    );

    const handleOnChange = (value, prop) => {
        setTranslate(prevState => {
            prevState[prop] = value === "---" ? "" : value;
            return prevState;
        });
        update();
    }

    const selectPickers = {
        from: {
            value: translate.from,
            placeholder: translate.from,
            data: langs.from,
            cleanable: false,
            style: { width: 160 },
            onChange: value => handleOnChange(value, "from")
        },
        to: {
            value: translate.to,
            placeholder: translate.to,
            data: langs.to,
            cleanable: false,
            style: { width: 160 },
            onChange: value => handleOnChange(value, "to")
        }
    }

    return (
        <Form layout="inline">
            <FormGroup>
                <ControlLabel>Translate from </ControlLabel>
                <SelectPicker { ...selectPickers.from } />
            </FormGroup>
            <FormGroup>
                <ControlLabel>to</ControlLabel>
                <SelectPicker { ...selectPickers.to } />
            </FormGroup>
        </Form>
    );
}

export default LangPairSorter;
