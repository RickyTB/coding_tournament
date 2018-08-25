import React from 'react';
import Link from 'redux-first-router-link';
import PropTypes from 'prop-types';

import classes from './Logo.scss';

const logo = props => {
    return (
        <nav className={props.className}>
            <Link className={classes.Logo} to="/">
                <h2>Dericktum</h2>
            </Link>
        </nav>
    );
};

logo.propTypes = {
    className: PropTypes.string
};

export default logo;
