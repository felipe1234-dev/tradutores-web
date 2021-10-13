import { FormGroup, FormControl, ControlLabel } from "rsuite";

const TextArea = ({ label, rows, ...rest }) => (
    <FormGroup>
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl {...rest} rows={rows} componentClass="textarea" />
    </FormGroup>
);

TextArea.defaultProps = {
    rows: 5,
    label: false
};

export default TextArea;
