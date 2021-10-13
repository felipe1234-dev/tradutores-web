import { 
    Icon, 
    FormGroup, 
    FormControl, 
    InputGroup, 
    ControlLabel 
} from "rsuite";
import "src/styles/global/formfield/FormField.scss";

const FormField = ({
    icons,
    onClicks,
    label,
    size,
    inside,
    ...rest
}) => {

    const iconList = icons.reduce((arr, icon, i) => {
        if (icon) {
            arr.push({
                name: icon, 
                placement: i === 0 ? "left" : "right",
                onClick: onClicks[i]
            });
        }
        return arr;
    }, []);

    return (
        <div component="formfield">
            <FormGroup>
                {label && <ControlLabel>{label}</ControlLabel>}
                <InputGroup size={size} inside={inside}>
                    {iconList.map((icon, i) => {
                        if (!icon.onClick) {
                            return (
                                <InputGroup.Addon 
                                    key={i} placement={icon.placement}
                                >
                                    <Icon icon={icon.name} />
                                </InputGroup.Addon>
                            );
                        }
                        else {
                            return (
                                <InputGroup.Button
                                    key={i} placement={icon.placement}
                                    onClick={icon.onClick}
                                >
                                    <Icon icon={icon.name} />
                                </InputGroup.Button>
                            );
                        }
                    })}
                    <FormControl { ...rest }/>
                </InputGroup>
            </FormGroup>
        </div>
    );
}

FormField.defaultProps = {
    inside: true,
    size: "md",
    icons: [null, null],
    onClicks: [null, null]
};

export default FormField;
