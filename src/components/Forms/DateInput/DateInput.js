import React from 'react';
import Datetime from "react-datetime";

const dateInput = ({meta: {touched, error}, input, id, label, placeholder, isValidDate}) => {
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <Datetime {...input} inputProps={{ id, placeholder, className: "form-control"}} isValidDate={isValidDate}/>
            <span className="help-block">
                {touched ? error : ""}
            </span>
        </div>
    );
};

export default dateInput;