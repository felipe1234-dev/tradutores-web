import React, { useState, useEffect, useContext } from "react";
import { Whisper, Tooltip, Alert } from "rsuite";
import { BodyContext } from "src/scripts/global/BodyGenerator/contexts";

const Speaker = progress => (
    <Tooltip progress={progress}>
        {progress === "not-translated" ? (
            <>
                <b><i>Nobody</i></b> has done a translation yet.. <b>
                :(</b> Click to make your own!
            </>
        ) : (
        progress === "not-checked" ? (
            <>
                <b>Click</b> to rate this translation
            </> 
        ) : (
            <>
                You were the last to translate this sentence <b>:O</b>
            </>
        ))}
    </Tooltip>
);

function Sentence({ snt }) {
    const ctx = useContext(BodyContext);
    const [progress, setProgress] = useState("not-translated");

    useEffect(() => {
        switch (ctx.route) {
            case "doc":
                const URL = `/progress/?sntID=${snt.ID}&docID=${ctx.docID}`;
                fetch(URL, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                })
                .then(async res => {
                    if (res.ok) return res.json(); 
                    return res.text().then(err => Promise.reject(err));
                })
                .then(res => setProgress(res.progress))
                .catch(err => Alert.error(err));
            
                break;

            case "preview":
                setProgress("not-translated");
            
                break;

            default:
                break;
        }
    }, [ctx.route, ctx.docID, snt.ID]);

    const props = {
        whisper: {
            placement: "top",
            trigger: "hover", 
            speaker: Speaker(progress)
        },
        span: {
            className: "sentence",
            progress: progress,
            dangerouslySetInnerHTML: { __html: snt.innerHTML },
            onClick: () => (
                ctx.route === "doc" ? ctx.onClick(snt) : console.log("nothin'!")
            )
        }
    }

    return (
        <Whisper { ...props.whisper }>
            <span { ...props.span }/>
        </Whisper>
    );
}

export default Sentence;