import React from 'react';

const panel = props => (
    <div className={['card', props.className].join(' ')}>
        <div className="card-body">
            {props.children}
        </div>
    </div>
);

export default panel;