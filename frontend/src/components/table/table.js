import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'services/routes';
import './table.css';

export const Table = ({ list, listType, fields, idField }) => (
    <table className="table">
        <thead className="table__header">
        	{buildTableHeader(fields)}
        </thead>
        <tbody className="table__content">
        	{buildTableBody(list, listType, fields, idField)}
        </tbody>
    </table>
);

function buildTableHeader(fields) {
    return (
        <tr>
            {fields.map(field =>
                <th key={field.key}>
                    {field.name}
                </th>
            )}
        </tr>
    )
}

function buildTableBody(list, listType, fields, idField) {
    const EDIT_PATH = ROUTES.EDIT.replace(':type', listType);

    return list.map(item => {
        const idValue = item[idField];

        return (
            <tr key={idValue}>
                {fields.map(field => {
                    const fieldKey = field.key;
                    const fieldValue = getFieldValue(field, item);

                    return (
                        <td key={idValue + fieldKey}>
                            {
                                fieldKey === idField ? (
                                    <Link
                                        className="table__link"
                                        to={EDIT_PATH.replace(':id', idValue)}
                                    >
                                        {fieldValue}
                                    </Link>
                                ) : fieldValue
                            }
                        </td>
                    )
                })}
            </tr>
        )
    });
}

function getFieldValue(field, item) {
    const value = item[field.key];

    switch (field.type) {
        case 'select':
            return field.options.find(opt => opt.id === value).name;
        case 'date':
            return new Date(value).toLocaleDateString();
        default:
            return value;
    }
}
