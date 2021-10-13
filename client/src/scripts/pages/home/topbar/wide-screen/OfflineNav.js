import { Nav, Button } from "rsuite"; 

const OfflineNav = ({ setModal }) => (
    <>
        <Nav.Item className="rs-nav-btn rs-login-btn">
            <Button color="blue" onClick={() => setModal("login")}> 
                Log in
            </Button>
        </Nav.Item>
        <Nav.Item className="rs-nav-btn rs-signup-btn">
            <Button color="green" onClick={() => setModal("signup")}> 
                Sign up
            </Button>
        </Nav.Item>
    </>
);

export default OfflineNav;