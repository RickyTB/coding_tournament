import React, {Fragment} from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.scss';

const layout = (props) => {
    return (
        <Fragment>
            <Toolbar/>
            <div className={classes.Layout}>
                <main className={classes.Main}>
                    {props.children}
                </main>
            </div>
        </Fragment>
    );
};

export default layout;