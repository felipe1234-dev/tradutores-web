import React, { useContext } from "react";
import { Dropdown, Nav, Button, Alert, Avatar } from "rsuite";
import { Link } from "react-router-dom";

import { SessionContext } from "src/scripts/contexts";

function OnlineNav({ setModal }) {
    const [session] = useContext(SessionContext);
    const { id, username, avatar } = session.user;

    const logout = () => {
        fetch("/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
        .then(async res => {
            if (res.ok) return res.text(); 
            return res.text().then(err => Promise.reject(err));
        })
        .then(() => window.location.reload())
        .catch(err => Alert.error(err));
    }

    const props = {
        dropdown: {
            title: username,
            icon: (
                <Avatar 
                    circle 
                    size="sm"
                    src={avatar ? `src/media/${avatar}` : ""}
                >
                    {username && username[0]}
                </Avatar>
            )
        },
        logout: {
            onClick: () => logout()
        },
        upload: {
            color: "green", 
            onClick: () => setModal("upload")
        }
    }

    return (
        <>
            <Dropdown { ...props.dropdown }>
                <Dropdown.Item>
                    <Link to={`/profile/${id}`}>
                        Your profile
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item { ...props.logout }>
                    Logout
                </Dropdown.Item>
            </Dropdown>
            <Nav.Item className="rs-nav-btn rs-upload-btn">
                <Button { ...props.upload }> 
                    Upload a Doc
                </Button>
            </Nav.Item>
        </>
    );
}

export default OnlineNav;