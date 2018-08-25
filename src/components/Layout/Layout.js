import React, {Fragment} from 'react';
import {Notifications} from "redux-notification";

import classes from './Layout.scss';
import Logo from "../Navigation/Logo/Logo";

const layout = (props) => {
    return (
        <Fragment>
            <Logo className={classes.Logo}/>
            <div className={classes.Layout}>
                <main className={classes.Main}>
                    {props.children}
                </main>
            </div>
            <Notifications/>
        </Fragment>
    );
};

export default layout;