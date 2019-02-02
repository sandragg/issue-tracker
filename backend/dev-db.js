const sequelize = require('./models');
const { models } = sequelize;

function createOptions() {
    const statuses = models.Status.bulkCreate([
        { name: 'Новая' },
        { name: 'Открытая' },
        { name: 'Решенная' },
        { name: 'Закрытая' }
    ]);
    const urgencies = models.Urgency.bulkCreate([
        { name: 'Очень срочно' },
        { name: 'Срочно' },
        { name: 'Несрочно' },
        { name: 'Совсем несрочно' }
    ]);
    const criticalities = models.Criticality.bulkCreate([
        { name: 'Авария' },
        { name: 'Критичная' },
        { name: 'Некритичная' },
        { name: 'Запрос на изменение' }
    ]);

    return Promise.all([
        statuses,
        urgencies,
        criticalities
    ]);
}

function createFields() {
    return models.Field.bulkCreate([
        {
            model: 'user',
            key: 'login',
            name: 'Login',
            type: 'text',
            autocomplete: false,
            mutable: false,
            hidden: false
        },
        {
            model: 'user',
            key: 'name',
            name: 'Name',
            type: 'text',
            autocomplete: false,
            mutable: true,
            hidden: false
        },
        {
            model: 'user',
            key: 'surname',
            name: 'Surname',
            type: 'text',
            autocomplete: false,
            mutable: true,
            hidden: false
        },
        {
            model: 'issue',
            key: 'id',
            name: 'Id',
            type: 'number',
            autocomplete: true,
            mutable: false,
            hidden: false
        },
        {
            model: 'issue',
            key: 'date',
            name: 'Creation date',
            type: 'date',
            autocomplete: true,
            mutable: false,
            hidden: false
        },
        {
            model: 'issue',
            key: 'title',
            name: 'Title',
            type: 'text',
            autocomplete: false,
            mutable: false,
            hidden: false
        },
        {
            model: 'issue',
            key: 'description',
            name: 'Description',
            type: 'text',
            autocomplete: false,
            mutable: false,
            hidden: true
        },
        {
            model: 'issue',
            key: 'status',
            name: 'Status',
            type: 'select',
            autocomplete: false,
            mutable: true,
            hidden: false
        },
        {
            model: 'issue',
            key: 'urgency',
            name: 'Urgency',
            type: 'select',
            autocomplete: false,
            mutable: false,
            hidden: true
        },
        {
            model: 'issue',
            key: 'criticality',
            name: 'Criticality',
            type: 'select',
            autocomplete: false,
            mutable: false,
            hidden: true
        },
        {
            model: 'issue',
            key: 'user_login',
            name: 'User',
            type: 'text',
            autocomplete: true,
            mutable: false,
            hidden: false
        }
    ]);
}

function createUsers() {
    return models.User.bulkCreate([
        {
            login: 'bob',
            name: 'Bob',
            surname: 'Bobovich',
            password: 'bob123'
        },
        {
            login: 'test',
            name: 'Test',
            surname: 'User',
            password: 'test123'
        },
        {
            login: 'admin',
            name: 'Vip',
            surname: 'User',
            password: 'admin123'
        }
    ]);
}

sequelize
    .sync()
    .then(createOptions)
    .then(createFields)
    .then(createUsers);
