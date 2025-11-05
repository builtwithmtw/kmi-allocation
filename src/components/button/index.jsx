import React from "react";
import "./button.css";

const Button = ({ onClick = () => { }, text = "", ...rest }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="btn-primary"
            {...rest}
        >
            {text}
        </button>
    );
};

export default Button;
