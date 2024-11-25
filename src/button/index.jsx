import React from 'react';

export const Button = React.memo(({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
));
