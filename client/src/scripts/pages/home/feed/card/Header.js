import React from "react";

import { Link } from "react-router-dom";
import { Avatar } from "rsuite";

import Flags from "src/scripts/global/Flags";

function Header({ PostedBy, Avatar: avatar, Username, TranslateFrom, TranslateTo }) {

    const props = {
        avatar: {
            size: "xs",
            circle: true,
            src: avatar ? `src/media/${avatar}` : ""
        },
        flags: {
            translate: { to: TranslateTo, from: TranslateFrom }
        }
    }

    return (
        <div className="card-header">
            <span className="card-from">
                Published by&nbsp;
                <Avatar { ...props.avatar }>
                    {Username[0]}
                </Avatar>&nbsp;
                <Link to={`/profile/${PostedBy}`}>
                    {Username}
                </Link>
            </span>
            <span className="card-attachment">
                <Flags { ...props.flags } />
            </span>
        </div>
    );
}

export default Header;