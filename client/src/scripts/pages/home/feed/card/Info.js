import React from "react";
import { Icon, IconButton } from "rsuite";

import ProgressBar from "src/scripts/global/ProgressBar";

function Info({ Upvotes, Done, Total }) {

    const props = {
        iconButton: {
            size: "sm",
            icon: <Icon icon="chevron-up" />,
            circle: true
        },
        progressBar: {
            percent: Math.round(Done/Total*100)
        }
    }

    return (
        <div className="card-info">
            <div className="info-center">
                <IconButton { ...props.iconButton } />&nbsp;
                {Upvotes}
                &nbsp;
            </div>
            <div className="info-right">
                <ProgressBar { ...props.progressBar } />
            </div>
        </div>
    );
}

export default Info;