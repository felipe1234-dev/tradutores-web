import React from "react";
import {
    Nav,
    Icon,
    IconButton,
    Dropdown,
    Whisper, 
    Tooltip,
    Button
} from "rsuite";

function SmallScreenNav({ theme, navigation }) {
    const { darkMode, setDarkMode } = theme;
    const { onSelect, activeKey   } = navigation;

    const nav = {
        left : {
            onSelect : onSelect, 
            activeKey: activeKey
        }
    }

    return (
        <> 
            <Nav { ...nav.left }>
                <Nav.Item eventKey="1" icon={<Icon icon="book" />}>
                    Docs
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<Icon icon="play-circle" />}>
                    Videos
                </Nav.Item>
            </Nav>
            <Nav pullRight>
                <Dropdown
                    className="rs-nav-btn"
                    icon={<Icon icon="bars" />} 
                    placement="leftStart"
                    noCaret
                >
                    <Dropdown.Item>New File</Dropdown.Item>
                    <Dropdown.Item>New File with Current Profile</Dropdown.Item>
                    <Dropdown.Item>Download As...</Dropdown.Item>
                    <Dropdown.Item>Export PDF</Dropdown.Item>
                    <Dropdown.Item>Export HTML</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>About</Dropdown.Item>
                </Dropdown>
            </Nav>
        </> 
    );
}

export default SmallScreenNav;