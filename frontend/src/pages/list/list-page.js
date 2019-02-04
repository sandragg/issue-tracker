import React, {
    useRef,
    useState,
    useEffect
} from 'react';
import { ROUTES } from 'services/routes';
import { listsOptions } from 'services/list-options';
import { Field } from 'api/models';
import { Table } from 'components/table';
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
            <Table
                list={list}
                listType={params.type}
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
