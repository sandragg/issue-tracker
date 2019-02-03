import React from 'react';
import './button.css';

export const Button = ({ children, theme, className = '', ...props }) => (
	<button
        className={`button button_${theme} ${className}`}
		{...props}
	>
		{children}
	</button>
);
