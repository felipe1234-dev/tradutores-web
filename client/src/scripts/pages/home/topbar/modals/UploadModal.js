import React, { useRef, useState, useEffect } from "react";
import {
    Form,
    Button,
    SelectPicker,
    ButtonGroup,
    FlexboxGrid,
    Loader,
    Schema,
    Modal, 
    Steps,
    Alert
} from "rsuite";

import FormField from "src/scripts/global/FormField";
import languages from "src/scripts/json/languages";
import topics from "src/scripts/json/topics";

import "src/styles/home/upload/Upload.scss";

const langs = languages.filter(lang => lang.label !== "---");

const { StringType, NumberType } = Schema.Types;
    
const model = Schema.Model({
    source: StringType()
        .isURL("Please enter a valid URL address")
        .isRequired("URL is required"),

    topic: StringType().isRequired("Topic is required"),

    docLang: StringType()
        .addRule((value, { targetLang }) => (
            value !== targetLang
        ), "Doc cannot be translated into the language they are in")
        .isRequired("Doc language is required"),

    targetLang: StringType()
        .addRule((value, { docLang }) => (
            value !== docLang
        ), "Doc cannot be translated into the language they are in")
        .isRequired("Target language is required"),

    title: StringType()
        .isRequired("Wait for the system to recognize the title of the doc"),
    
    length: NumberType()
        .isRequired("Wait for the system to recognize the length of the doc.")
});

const Step1 = () => (
    <>
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={5}>
                <h4>Upload</h4>
            </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={15}>
                <FormField 
                    name="source" placeholder="Enter a web address" 
                    type="text" size="lg" label="Doc source: "
                />
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </>
);

const Step2 = () => (
    <>
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={5}>
                <h4>Topic & Languages</h4>
            </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid justify="space-around">
            <FlexboxGrid.Item colspan={7}>
                <FormField 
                    name="docLang" data={langs}
                    accepter={SelectPicker}
                    label="Translate from"
                    style={{ width: "100%" }}
                />
                <FormField 
                    name="targetLang" data={langs}
                    accepter={SelectPicker}
                    label="Translate to"
                    style={{ width: "100%" }}
                />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={7}>
                <FormField 
                    name="topic" data={topics}
                    accepter={SelectPicker}
                    label="Choose a topic"
                    style={{ width: "100%" }}
                />
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </>  
);

const Step3 = ({ url, formValue, setFormValue }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const iframeItem = iframeRef.current;
        
        let t = iframeItem.contentWindow.document.querySelector(".title p");
        let titleLoaded = !!t;

        let l = iframeItem.contentWindow.document.querySelector(".length p");
        let lengthLoaded = !!l;

        let intr = setInterval(() => {
            t = iframeItem.contentWindow.document.querySelector(".title p");
            titleLoaded = !!t;
            
            l = iframeItem.contentWindow.document.querySelector(".length p");
            lengthLoaded = !!l;

            if (titleLoaded) {
                t = t.innerHTML.trim();
            }

            if (lengthLoaded) {
                l = parseInt(l.innerHTML);
            }

            if (titleLoaded && lengthLoaded) {
                setFormValue({ ...formValue, title: t, length: l });
                clearInterval(intr);
            }
        }, 2000);
    }, [url]);

    return (
        <div className="iframe-container">
            {typeof url !== "undefined" && (
                <iframe 
                    ref={iframeRef}
                    title="preview-iframe"
                    src={`${window.location.href}preview?url=${url}`}
                >
                </iframe>
            )}
        </div>
    );
}

function UploadModal({ show, setShow }) {
    const [formValue, setFormValue] = useState({
        source: "",
        topic: "",
        docLang: "",
        targetLang: "",
        title: "",
        length: 0
    });
    
    const [loading, setLoading] = useState(false);

    const formRef = useRef(null);
    const [step, setStep] = useState(0);

    const onChange = nextStep => setStep(
        nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep
    );
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    const upload = () => {
        setLoading(true);

        fetch("/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValue)
        })
        .then(async res => {
            if (res.ok) return res.text(); 
            return res.text().then(err => Promise.reject(err));
        })
        .then(res => {
            Alert.success("Successfully uploaded doc!", 3000);
            
            const redirectURL = window.location.href + res;
            setTimeout(() => window.location.href = redirectURL, 1500);
        })
        .catch(err => Alert.error(err, 3000))
        .finally(() => setTimeout(() => setLoading(false), 1500));
    }

    const checkForm = () => {
        formRef.current.checkAsync().then(res => {
            if (res.hasError) {
                for (let field in res.formError) {
                    Alert.error(`Error in ${field}: ${res.formError[field]}`, 5000);
                }
            } 
            else {
                upload();
            }
        });
    }

    const props = {
        modal: {
            show: show, 
            onHide: () => setShow(!show),
            backdrop: "static",
            size: "md"
        },
        form: {
            ref: formRef,
            fluid: true,
            model: model, 
            formValue: formValue,
            onChange: formValue => setFormValue(formValue)
        },
        previous: {
            onClick: onPrevious, 
            disabled: step === 0
        },
        next: {
            onClick: onNext, 
            disabled: step === 2
        },
        uploadDoc: {
            onClick: checkForm,
            color: "green",
            disabled: step !== 2,
            className: "upload-doc-btn"
        }
    }

    return (
        <Modal { ...props.modal }>
            {loading && <Loader style={{ zIndex: 100 }} backdrop center />}
            <div component="upload-modal">
                <Modal.Header>
                    <Steps current={step}>
                        <Steps.Item title="Upload" />
                        <Steps.Item title="Topic & Languages" />
                        <Steps.Item title="Preview" />
                    </Steps>
                </Modal.Header>
                <Modal.Body>
                    <hr />
                    <Form { ...props.form }>
                        {step === 0 && <Step1 />}
                        {step === 1 && <Step2 />}
                        {step === 2 && (
                            <Step3 
                                url={formValue.source} 
                                setFormValue={setFormValue} 
                                formValue={formValue} 
                            />
                        )}
                    </Form>
                    <hr />
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button { ...props.previous }>
                            Previous
                        </Button>
                        <Button { ...props.next }>
                            Next
                        </Button>
                        {step === 2 && (
                            <Button { ...props.uploadDoc }>
                                Upload
                            </Button>
                        )}
                    </ButtonGroup>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default UploadModal;