const sequelize = require('./models');
const { models } = sequelize;

const createData = () => {
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
    const users = models.User.bulkCreate([
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
};

sequelize
    .sync()
    .then(createData);
