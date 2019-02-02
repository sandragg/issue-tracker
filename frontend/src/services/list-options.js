import { User, Issue } from "../api/models";

export const listsOptions = {
    user: {
        model: User,
        idField: 'login'
    },
    issue: {
        model: Issue,
        idField: 'id'
    }
};
