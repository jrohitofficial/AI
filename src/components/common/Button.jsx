import React from 'react';

const Button = ({ variant = 'ghost', children, ...props }) => (
    <button className={`button ${variant}`} type="button" {...props}>
        {children}
    </button>
);

export default Button;
