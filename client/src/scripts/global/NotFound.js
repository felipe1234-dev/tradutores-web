import { Panel, Icon } from "rsuite";
import { Link } from "react-router-dom";
import "src/styles/global/notfound/NotFound.scss";

function NotFound({ header, message, icon, size, callToAction }) {
    return (
        <div component="not-found">
            <Panel>
                <Icon icon={icon} size={size} />
                <h3>{header}</h3>
                <p>{message}</p>
                <Link to="/">{callToAction}</Link>
            </Panel>
        </div>
    );
}

export default NotFound;