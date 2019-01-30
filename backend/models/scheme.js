const Sequelize = require('sequelize');

const infoTable = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
};

const scheme = sequelize => {
    const User = sequelize.define('User', {
        login: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        password: Sequelize.STRING
    });
    const Issue = sequelize.define('Issue', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: Sequelize.DATE,
        title: Sequelize.STRING,
        description: Sequelize.STRING
    });
    const IssueHistory = sequelize.define('IssueHistory', {
        date: Sequelize.DATE,
        comment: {
            type: Sequelize.STRING,
            defaultValue: 'A new issue was created'
        }
    });
    const Status = sequelize.define('Status', infoTable);
    const Urgency = sequelize.define('Urgency', infoTable);
    const Criticality = sequelize.define('Criticality', infoTable);

    Issue.belongsTo(User);
    Issue.belongsTo(Status);
    Issue.belongsTo(Urgency);
    Issue.belongsTo(Criticality);

    IssueHistory.belongsTo(Issue);
    IssueHistory.belongsTo(Status);
    IssueHistory.belongsTo(User);
};

module.exports = scheme;
