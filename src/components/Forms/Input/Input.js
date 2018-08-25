import React from 'react';

const input = ({meta: {touched, error}, input, id, label, placeholder, type, inputClasses}) => {
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
        <div className={className}>
            {label &&<label htmlFor={id}>{label}</label>}
            <input id={id}
                   className={'form-control ' + (inputClasses ? inputClasses : ' ')}
                   {...input}
                   placeholder={placeholder}
                   type={type ? type : 'text'}/>
            <span className="help-block">
                {touched ? error : ""}
            </span>
        </div>
    );
};

export default input;