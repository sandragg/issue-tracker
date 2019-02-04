import React from 'react';
import './field.css';

export const Field = props => {
	const { id, name, type } = props;
	const Component = type === 'select'
		? SelectInput
		: Input;

	return (
        <div className="field">
            <label
				className="field__label"
				htmlFor={id}
			>
				{name}
			</label>
            <Component {...props} />
        </div>
	);
};

const Input = ({ name, ...props }) => (
    <input
        className="field__input"
        placeholder={`Enter the ${name}`}
        {...props}
    />
);

const SelectInput = ({ options, ...props }) => (
    <select
		className="field__input"
        {...props}
	>
		{options && options.map(({ id, name }) => (
			<option key={id} value={id}>{name}</option>
		))}
    </select>
);
