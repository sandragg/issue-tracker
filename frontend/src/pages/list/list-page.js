import React, {
    useRef,
    useState,
    useEffect
} from 'react';
import { Link } from "react-router-dom";
import { ROUTES } from "../../services/routes";
import { listsOptions } from "../../services/list-options";
import './list-page.css';

export const ListPage = ({ match }) => {
    const listOpts = useRef(null);
    const [ list, setList ] = useState(null);

    useEffect(() => {
        listOpts.current = listsOptions[match.params.type];
        listOpts.current.model.getAll().then(setList);
    }, [match.params.type]);

    return list && list.length ? (
        <section className="section list-section">
            <table className="list-section__table">
                <thead className="table__header">
                    {buildTableHeader(listOpts.current.fields)}
                </thead>
                <tbody className="table__content">
                    {buildTableBody(list, listOpts.current)}
                </tbody>
            </table>
        </section>
    ) : (
        <span className="notice">List is empty</span>
    );
};

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

function buildTableBody(list, listOptions) {
    const { idField, fields } = listOptions;

    return list.map(item => {
        const idValue = item[idField];

        return (
            <tr key={idValue}>
                {fields.map(field => {
                    const fieldKey = field.key;
                    const fieldValue = item[fieldKey];

                    return (
                        <td key={idValue + fieldKey}>
                            {
                                fieldKey === idField ? (
                                    <Link
                                        className="table__link"
                                        to={ROUTES.EDIT.replace(':id', idValue)}
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
