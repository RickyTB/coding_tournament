import React from 'react';

const inputWAddon = ({meta: {touched, error}, input, id, label, placeholder, type, children, autoComplete}) => {
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
        <div className={className}>
            {label &&<label htmlFor={id}>{label}</label>}
            <div className="input-group">
                <span className="input-group-addon">{children}</span>
                <input id={id}
                       className="form-control"
                       {...input}
                       placeholder={placeholder}
                       autoComplete={autoComplete}
                       type={type}/>
            </div>
            <span className="help-block">
                    {touched ? error : ""}
                </span>
        </div>
    );
};

export default inputWAddon;