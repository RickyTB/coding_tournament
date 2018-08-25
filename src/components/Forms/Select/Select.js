import React from 'react';
import {BP_ICON} from "../../../utils/resources";

const select = ({meta: {touched, error}, input, id, label, children, images, alt}) => {
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <img
                            src={images[input.value - 1] || BP_ICON}
                            alt={alt}
                            style={{height: '24px'}}/>
                    </span>
                </div>
                <select id={id} className="form-control" {...input}>
                    {children}
                </select>
            </div>
        </div>
    );
};

export default select;