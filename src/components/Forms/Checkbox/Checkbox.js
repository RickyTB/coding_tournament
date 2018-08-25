import React from 'react';

import classes from './Checkbox.scss';

const checkbox = ({meta: {touched, error}, input, id, label}) => {
    const className = `form-group ${touched && error ? "has-error" : ""}`;
    return (
        <div className={className}>
            <label className={classes.Container}>{label}
                <input type="checkbox" id={id} {...input}/>
                <span className={classes.Checkmark}/>
            </label>
        </div>
    );
};

export default checkbox;