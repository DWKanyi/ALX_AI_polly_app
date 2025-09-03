import React from 'react';

const PollsLayout = ({ children }) => {
    return (
        <div className="polls-layout">
            <h1>Polls</h1>
            <div>{children}</div>
        </div>
    );
};

export default PollsLayout;