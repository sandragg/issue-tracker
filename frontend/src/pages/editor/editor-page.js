import React, {
    useRef,
    useState,
    useEffect,
    useCallback
} from 'react';
import { Field as FieldModel } from 'api/models';
import { ROUTES } from 'services/routes';
import { listsOptions } from 'services/list-options';
import { Session } from 'services/session';
import { Field } from 'components/field';
import { Button } from 'components/button';
import { Table } from 'components/table';
import './editor-page.css';

const initialState = {
    'issue': {
        title: null,
        description: null,
        status: 1,
        urgency: 1,
        criticality: 1,
        comment: 'New issue'
    },
    'user': {
        login: null,
        name: null,
        surname: null
    }
};

export const EditorPage = (props) => {
    const { params: { type, id } } = props.match;
    const path = useRef(ROUTES.LIST.replace(':type', type));
    const listOpts = useRef(null);
    const listFields = useRef(null);
    const historyFields = useRef(null);
    const history = useRef(null);
    const [ data, setData ] = useState(initialState[type]);
    const goBack = useCallback(
        () => props.history.push(path.current),
        [type]
    );
    const onSubmit = useCallback(
        () =>
            checkDataValidity(data, type)
            && postData(listOpts.current.model, data, id, type)
                .then(res => {
                    console.log(res);
                    goBack();
                }),
        [data]
    );
    const onChange = useCallback(
        (key, value) => setData({ ...data, [key]: value }),
        [data]
    );

    useEffect(() => {
        listOpts.current = listsOptions[type];

        (type === 'issue'
            ? getIssueData(listOpts.current.model, id)
            : getUserData(listOpts.current.model, id)
        )
            .then(({ data, fields, hist, histFields }) => {
                listFields.current = fields;
                history.current = hist;
                historyFields.current = histFields;
                setData(data);
            })
            .catch(err => console.log(err))
    }, [type]);

    return listFields.current ? (
        <>
            <section className="section form-section">
                <h1 className="form-section__title">
                    {buildFormTitle(type, id)}
                </h1>
                <div className="form-section__form">
                    {buildFormFields(listFields.current, data, onChange, id)}
                </div>
                <div className="button-container">
                    <Button theme="cancel" onClick={goBack}>Cancel</Button>
                    <Button theme="submit" onClick={onSubmit}>Save</Button>
                </div>
            </section>
            <section className="section history-section">
                {history.current && history.current.length ? (
                    <Table
                        list={history.current}
                        fields={historyFields.current}
                    />
                ) : null}
            </section>
        </>
    ) : null;
};

function getUserData(model, id) {
    return Promise.all([
        id && model.getById(id),
        FieldModel.getById('user')
    ])
        .then(([ data, fields ]) => {
            if (typeof data !== 'object' && id) {
                return new Error(data);
            }

            return {
                data: data || initialState.user,
                fields: fields.filter(
                    id ? filterEditorFields : filterCreationFields
                )
            };
        });
}

function getIssueData(model, id) {
    return Promise.all([
        id && model.getById(id),
        id && FieldModel.getById('history'),
        FieldModel.getById('issue')
    ])
        .then(([ data, histFields, fields ]) => {
            if (typeof data !== 'object' && id) {
                return new Error(data);
            }
            const issue = data && data[0];
            const hist = data && data[1];

            setStatusOptions(fields, issue);

            return {
                data: issue || initialState.issue,
                fields: fields.filter(
                    id ? filterEditorFields : filterCreationFields
                ),
                hist,
                histFields
            };
        });
}

function checkDataValidity(data, listType) {
    if (listType === 'issue' && data.id && !data.comment) {
        return false;
    }
    return Object.keys(data).every(key => data[key]);
}

function postData(model, data, itemId, listType) {
    if (listType === 'issue') {
        data.user = Session.getUser().login;
        data.date = new Date();

        if (itemId) {
            data = {
                data,
                comment: data.comment
            }
        }
    }

    return model[itemId ? 'update': 'create'](data, itemId);
}

function filterCreationFields(field) {
    return !field.autocomplete;
}

function filterEditorFields(field) {
    return !(field.autocomplete || field.private);
}

// TODO Fix it
function setStatusOptions(fields, item) {
    const statusField = fields.find(
        field => field.key === 'status'
    );
    const steps = [ [4], [1, 2], [2, 3], [2, 3, 4] ];
    const statusOpts = statusField.options;
    const statusId = item && item.status;
    const validStatusIds = statusId
        ? steps[statusId % steps.length]
        : [1];

    statusField.options = statusOpts.filter(
        opt => ~validStatusIds.indexOf(opt.id)
    );
}

function buildFormTitle(listType, itemId) {
    return itemId
        ? `Edit ${listType}: ${itemId}`
        : `Create ${listType}`;
}

function buildFormFields(fields, item, onChange, isEditing) {
    return fields.map(field => {
        const { key, name, type, options, mutable } = field;
        const props = { key, name, type, options };

        return <Field
            id={key}
            defaultValue={item && item[key]}
            onChange={e => onChange(key, e.target.value)}
            disabled={isEditing && !mutable}
            {...props}
        />
    });
}
