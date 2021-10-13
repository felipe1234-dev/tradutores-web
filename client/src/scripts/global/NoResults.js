import { Panel, Icon } from "rsuite";
import "src/styles/global/noresults/NoResults.scss";

function NoResults({ header, message, icon, size }) {
    return (
        <div component="no-results">
            <Panel>
                <Icon icon={icon} size={size} />
                <h3>{header}</h3>
                <p>{message}</p>
            </Panel>
        </div>
    );
}

export default NoResults;