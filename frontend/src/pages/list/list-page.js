import React, {
    useRef,
    useState,
    useEffect
} from 'react';
import { Link } from "react-router-dom";
import { ROUTES } from "../../services/routes";
import { listsOptions } from "../../services/list-options";
import { Field } from 'api/models';
import './list-page.css';

export const ListPage = (props) => {
    const { match: { params }} = props;
    const [ list, setList ] = useState(null);
    const listOpts = useRef(null);
    const listFields = useRef(null);

    useEffect(() => {
        listOpts.current = listsOptions[params.type];

        Promise.all([
            listOpts.current.model.getAll(),
            Field.getById(params.type)
        ])
            .then(([ items, fields ]) => {
                listFields.current = fields.filter(filterVisibleFields);
                setList(items);
            });
    }, [params.type]);

    return list && list.length ? (
        <section className="section list-section">
            <table className="list-section__table">
                <thead className="table__header">
                    {buildTableHeader(listFields.current)}
                </thead>
                <tbody className="table__content">
                    {buildTableBody(
                        list,
                        params.type,
                        listFields.current,
                        listOpts.current
                    )}
                </tbody>
            </table>
        </section>
    ) : (
        <span className="notice">List is empty</span>
    );
};

function filterVisibleFields(field) {
    return !field.hidden;
}

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

function buildTableBody(list, listType, fields, opts) {
    const { idField } = opts;
    const EDIT_PATH = ROUTES.EDIT.replace(':type', listType);

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
