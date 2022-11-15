import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWallet} from "@fortawesome/free-solid-svg-icons";
import {Button, TextField} from "@material-ui/core";
import PasswordField from "../components/PasswordField";
import React, {useState} from "react";
import "../css/views/LoginAndRegistrationView.css"
import {Link} from "react-router-dom";
import axios from "axios";
import {registerUserUrl} from "../assets/properties";

const RegistrationView = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repeatedPassword: ""
    });

    function handleChange(event) {
        setFormData(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    function handleSubmit() {
        if (formData.name !== ""
            && formData.email !== ""
            && formData.password !== ""
            && formData.repeatedPassword !== ""
            && formData.password === formData.repeatedPassword
        ) {
            const payload = {...formData};
            delete payload.repeatedPassword;
            axios.post(registerUserUrl, payload)
                .then(resp => {
                    if(resp.data){
                        setFormData({
                            name: "",
                            email: "",
                            password: "",
                            repeatedPassword: ""
                        });
                        alert("Registration completed");
                    }
                    else {
                        alert("Registration rejected")
                    }
                })
        } else {
            alert("Wrong credentials");
        }
    }

    return (
        <div id="RegistrationViewContainer">
            <h1 className="Title"><FontAwesomeIcon icon={faWallet} id="WalletIcon"/>My Little Savings</h1>
            <form className="RegistrationForm" autoComplete="off">
                <p className="WelcomeText">Nice to see you</p>
                <h2>Create an account</h2>
                <TextField id="UsernameInput" name="name" className="TextInput" label="Username" variant="outlined"
                           value={formData.name} onChange={handleChange}/>
                <TextField id="EmailInput" name="email" className="TextInput" label="Email" variant="outlined"
                           value={formData.email} onChange={handleChange}/>
                <PasswordField id="PasswordInput" placeholder="Password" name="password" labelWidth={70}
                               value={formData.password} onChange={handleChange}/>
                <PasswordField id="RepeatedPasswordInput" placeholder="Repeat Password" name="repeatedPassword"
                               labelWidth={130} value={formData.repeatedPassword} onChange={handleChange}/>
                <Button className="LoginButton" variant="contained" color="primary" onClick={handleSubmit}>
                    Register
                </Button>
                <p className="BottomFormText">Already have an account?
                    <Link to="/" className="Link">
                        Login here!
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegistrationView;