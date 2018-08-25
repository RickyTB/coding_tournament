import React from 'react';

const textArea = ({meta: {touched, error}, input, id, label, placeholder, rows, maxLength}) => {
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <textarea id={id}
                      className="form-control"
                      {...input}
                      placeholder={placeholder}
                      rows={rows}
                      maxLength={maxLength}/>
            <span className="help-block">
                    {touched ? error : ""}
                </span>
        </div>
    );
};

export default textArea;