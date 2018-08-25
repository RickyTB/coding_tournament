import React from 'react';

const input = ({meta: {touched, error}, input, id, label, placeholder, type, inputClasses}) => {
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
        <div className={className}>
            <label htmlFor={id} className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-10">
                <input id={id}
                       className={'form-control ' + (inputClasses ? inputClasses : ' ')}
                       {...input}
                       placeholder={placeholder}
                       type={type ? type : 'text'}/>
            </div>
            <span className="help-block">
                {touched ? error : ""}
            </span>
        </div>
    );
};

export default input;