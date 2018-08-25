import React from 'react';

const input = ({meta: {touched, error}, input, id, label, placeholder, rows, maxLength}) => {
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
        <div className={className}>
            <label htmlFor={id} className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-10">
                <textarea id={id}
                          className="form-control"
                          {...input}
                          placeholder={placeholder}
                          rows={rows}
                          maxLength={maxLength}/>
            </div>
            <span className="help-block">
                {touched ? error : ""}
            </span>
        </div>
    );
};

export default input;