import React from "react";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import "../css/components/PasswordField.css";

const PasswordField = (props) => {
    const [show, setShow] = useState(false);

    const handleClickShowPassword = () => {
        setShow(prev => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <FormControl id="PasswordInput" className="PasswordInput" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{props.placeholder}</InputLabel>
            <OutlinedInput
                id={props.id}
                name={props.name}
                type={show ? 'text' : 'password'}
                value={props.value}
                onChange={props.onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {show ? <FontAwesomeIcon style={{fontSize: "0.9em"}} icon={faEye}/> :
                                <FontAwesomeIcon style={{fontSize: "0.9em"}} icon={faEyeSlash}/>}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={props.labelWidth}
            />
        </FormControl>
    )
}

export default PasswordField;