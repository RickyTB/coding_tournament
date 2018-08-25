import React from 'react';

import classes from './FAB.scss';

const FAB = props => (
    <button title={props.title} className={`btn btn-lg btn-primary ${classes.FAB}`}
            onClick={props.onClick}>{props.children}</button>
);

export default FAB;