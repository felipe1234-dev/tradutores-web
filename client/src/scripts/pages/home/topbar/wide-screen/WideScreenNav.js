import React, { useState, useContext } from "react";
import { Nav, Icon, IconButton, Whisper, Tooltip } from "rsuite";

import OfflineNav from "src/scripts/pages/home/topbar/wide-screen/OfflineNav";
import OnlineNav from "src/scripts/pages/home/topbar/wide-screen/OnlineNav";

import LoginModal from "src/scripts/pages/home/topbar/modals/LoginModal";
import UploadModal from "src/scripts/pages/home/topbar/modals/UploadModal";

import { ThemeContext, SessionContext } from "src/scripts/contexts";

function WideScreenNav() {
    const [theme, setTheme] = useContext(ThemeContext);
    const [session] = useContext(SessionContext);
    const { loggedIn } = session;

    const [modal, setModal] = useState("");

    const nav = {
        self: {
            pullRight: true
        },
        whisper: {
            placement: "left",
            trigger: "hover",
            speaker: () => (
                <Tooltip>
                    Toggle light/dark theme
                </Tooltip>
            )
        },
        themeToggler: {
            className: "rs-nav-btn",
            onClick: () => setTheme(theme === "dark" ? "light" : "dark")
        },
        iconButton: {
            icon: <Icon icon={theme === "light" ? "sun-o" : "moon-o"} />
        }
    }

    const modals = {
        login: {
            show: modal === "login",
            setShow: (show) => setModal(!show ? "" :"login")        
        },
        signup: {
            show: modal === "signup",
            setShow: (show) => setModal(!show ? "" :"signup")
        },
        upload: {
            show: modal === "upload",
            setShow: (show) => setModal(!show ? "" : "upload")
        }
    }

    return (
        <>
            <Nav { ...nav.self }>
                {!loggedIn ? 
                    <OfflineNav setModal={setModal} /> 
                :
                    <OnlineNav setModal={setModal} />
                }
                <Whisper { ...nav.whisper }>
                    <Nav.Item { ...nav.themeToggler }>
                        <IconButton { ...nav.iconButton }/>
                    </Nav.Item>
                </Whisper>
            </Nav>
            <LoginModal { ...modals.login } />
            <UploadModal { ...modals.upload } />
        </> 
    );
    
}

export default WideScreenNav;