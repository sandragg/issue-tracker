import React, {
    useRef,
    useState,
    useEffect
} from 'react';
import { listsOptions } from 'services/list-options';
import { Field } from 'api/models';
import { Table } from 'components/table';
import './list-page.css';

export const ListPage = (props) => {
    const { params: { type }} = props.match;
    const [ list, setList ] = useState(null);
    const listOpts = useRef(null);
    const listFields = useRef(null);

    useEffect(() => {
        listOpts.current = listsOptions[type];

        Promise.all([
            listOpts.current.model.getAll(),
            Field.getById(type)
        ])
            .then(([ items, fields ]) => {
                listFields.current = fields.filter(filterVisibleFields);
                setList(items);
            });
    }, [type]);

    return list && list.length ? (
        <section className="section list-section">
            <Table
                list={list}
                listType={type}
                fields={listFields.current}
                idField={listOpts.current.idField}
            />
        </section>
    ) : (
        <span className="notice">List is empty</span>
    );
};

function filterVisibleFields(field) {
    return !field.hidden;
}
