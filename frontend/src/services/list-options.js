import { User, Issue } from "../api/models";

export const listsOptions = {
    user: {
        model: User,
        idField: 'login',
        fields: [
            {
                key: 'login',
                name: 'Login',
            },
            {
                key: 'name',
                name: 'Name',
            },
            {
                key: 'surname',
                name: 'Surname',
            }
        ]
    },
    issue: {
        model: Issue,
        idField: 'id',
        fields: [
            {
                key: 'id',
                name: 'Id',
            },
            {
                key: 'date',
                name: 'Creation date',
            },
            {
                key: 'status',
                name: 'Status',
            },
            {
                key: 'title',
                name: 'Title',
            },
            {
                key: 'user_login',
                name: 'User',
            }
        ]
    }
};
