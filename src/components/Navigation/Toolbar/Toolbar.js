import React from 'react';
import Link from 'redux-first-router-link';

import classes from './Toolbar.scss';

const toolbar = props => {
    return (
        <nav className={classes.Toolbar}>
            <div className={classes.ToolbarBody}>
                <div className={classes.Buttons}/>
                <Link className={classes.Logo} to="/">
                    <h3>Dericktum</h3>
                </Link>
                <div className={classes.Buttons}/>
            </div>
        </nav>
    );
};

export default toolbar;
