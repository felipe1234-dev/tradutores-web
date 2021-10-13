import React, { useRef, useState } from "react";
import {
    Form,
    Alert,
    Modal, 
    Button,
    Loader,
    IconButton,
    Divider,
    Schema,
    Icon
} from "rsuite";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import FormField from "src/scripts/global/FormField";

import "src/styles/home/login/Login.scss";

const { StringType } = Schema.Types;

const model = Schema.Model({
    username: StringType()
        .isRequired("This field is required."),
    email: StringType()
        .isEmail("Please enter a valid email address.")
        .isRequired("This field is required."),
    password: StringType()
        .isRequired("This field is required.")
});

function LoginModal({ show, setShow }) {
    const formRef = useRef(null);
  
    const [loading, setLoading] = useState(false);
    const [passVisible, setPassVisible] = useState(false); 
    const [formValue, setFormValue] = useState({
        username: "",
        email: "",
        password: ""
    });
    
    const login = body => {
        setLoading(true);

        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        .then(async res => {
            if (res.ok) return res.text(); 
            return res.text().then(err => Promise.reject(err));
        })
        .then(res => {
            Alert.success(res, 3000);
            setTimeout(() => window.location.reload(), 1500);
        })
        .catch(err => Alert.error(err, 3000))
        .finally(() => setTimeout(() => setLoading(false), 1500));
    }

    const defaultLogin = () => {
        formRef.current.checkAsync().then(res => {
            if (res.hasError) {
                for (let field in res.formError) {
                    Alert.error(`Error in ${field}: ${res.formError[field]}`, 5000);
                }
            } 
            else {
                login({ 
                    username: formValue.username,
                    email: formValue.email, 
                    type: "password",
                    access: formValue.password
                });
            }
        });
    }

    const googleLogin = res => {
        if ("error" in res) {
            Alert.error(`Something went wrong : ( Error: ${res.details}`);
        }
        else {
            login({
                email: res.profileObj.email, 
                type: "googleID",
                access: `${res.googleId}`
            });
        }
    }

    const facebookLogin = res => {
        if ("error" in res) {
            Alert.error(`Something went wrong : ( Error: ${res.details}`);
        }
        else {
            login({
                email: res.email,
                type: "facebookID",
                access: `${res.userID}`
            });
        }
    }

    const props = {
        modal: {
            show: show, 
            onHide: () => setShow(!show),
            backdrop: "static",
            size: "xs"
        },
        form: {
            ref: formRef,   
            fluid: true,
            model: model, 
            formValue: formValue,
            onChange: formValue => setFormValue(formValue)
        },
        username: {
            name: "username",
            placeholder: "Your username...",
            type: "text",
            icons: ["user-circle"]
        },
        email: {
            name: "email",
            placeholder: "Your email address...",
            type: "email",
            icons: ["at"]
        },
        password: {
            name: "password",
            placeholder: "Your password...",
            type: !passVisible ? "password" : "text",
            icons: ["unlock-alt", !passVisible ? "eye-slash" : "eye"],
            onClicks: [null, () => setPassVisible(!passVisible)]
        },
        defaultLogin: {
            appearance: "primary",
            onClick: () => defaultLogin(),
            block: true
        },
        googleLogin: {
            clientId: process.env.REACT_APP_GG_CLIENT_ID, 
            onSuccess: googleLogin,
            onFailure: googleLogin,
            cookiePolicy: "single_host_origin",
            render: renderProps => (
                <IconButton
                    block 
                    media="google"
                    icon={<Icon icon="google" />}
                    onClick={renderProps.onClick} 
                    disabled={false} 
                >
                    Log In with Google
                </IconButton>
            )
        },
        facebookLogin: {
            appId: process.env.REACT_APP_FB_APP_ID,
            autoLoad: false,
            fields: "name,email",
            callback: facebookLogin,
            render: renderProps => (
                <IconButton
                    block 
                    media="facebook"
                    icon={<Icon icon="facebook" />}
                    onClick={renderProps.onClick} 
                    disabled={false} 
                >
                    Log In with Facebook
                </IconButton>
            )
        }
    }

    return (
        <Modal { ...props.modal }>
            {loading && <Loader style={{ zIndex: 100 }} backdrop center />}
            <div component="login-modal">
                <Modal.Header>
                    <h4>Log In</h4>
                </Modal.Header>
                <Modal.Body>
                    <Form { ...props.form }>
                        <FormField { ...props.username } />
                        <FormField { ...props.email } />
                        <FormField { ...props.password } />
                        <Button { ...props.defaultLogin }>
                                Log In
                            </Button>
                            
                        <Divider>Or</Divider>

                        <GoogleLogin { ...props.googleLogin } />
                        <FacebookLogin { ...props.facebookLogin } />
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
}

export default LoginModal;