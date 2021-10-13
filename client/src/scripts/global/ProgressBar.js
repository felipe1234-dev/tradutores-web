import React, { useEffect, useState } from "react";
import { Progress } from "rsuite";

function ProgressBar({ percent, ...props }) {
    const { Line } = Progress;
    const [strokeColor, setStrokeColor] = useState("");

    useEffect(() => {
        if (percent <= 20) {
            setStrokeColor("#f04f43"); // red
        } 
        else if (percent <= 40) {
            setStrokeColor("#ffc107"); // yellow
        }
        else if (percent <= 60) {
            setStrokeColor("#34c3ff"); // light blue
        }
        else if (percent <= 80) {
            setStrokeColor("#485FC7"); // dark blue
        }
        else {
            setStrokeColor("#70B120"); // light green
        }
    }, [percent]);

    return <Line { ...props } percent={percent} strokeColor={strokeColor} />;
}

export default ProgressBar;