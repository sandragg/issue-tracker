const Sequelize = require('sequelize');

const options = { timestamps: false };

const infoTable = {
    id: {
        type: Sequelize.INTEGER(1),
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
    }, options);
    const Issue = sequelize.define('Issue', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: Sequelize.DATE,
        title: Sequelize.STRING,
        description: Sequelize.STRING
    }, options);
    const IssueHistory = sequelize.define('IssueHistory', {
        date: Sequelize.DATE,
        comment: {
            type: Sequelize.STRING,
            defaultValue: 'A new issue was created'
        }
    }, options);
    const Status = sequelize.define('Status', infoTable, options);
    const Urgency = sequelize.define('Urgency', infoTable, options);
    const Criticality = sequelize.define('Criticality', infoTable, options);

    Issue.belongsTo(User, { foreignKey: 'user_login' });
    Issue.belongsTo(Status, { foreignKey: 'status_id' });
    Issue.belongsTo(Urgency, { foreignKey: 'urgency_id' });
    Issue.belongsTo(Criticality, { foreignKey: 'criticality_id' });

    IssueHistory.belongsTo(Issue, { foreignKey: 'issue_id' });
    IssueHistory.belongsTo(Status, { foreignKey: 'status_id' });
    IssueHistory.belongsTo(User, { foreignKey: 'user_login' });

    const Field = sequelize.define('Field', {
        model: Sequelize.STRING,
        key: Sequelize.STRING,
        name: Sequelize.STRING,
        type: Sequelize.STRING,
        autocomplete: Sequelize.INTEGER(1),
        mutable: Sequelize.INTEGER(1),
        hidden: Sequelize.INTEGER(1)
    }, options)
};

module.exports = scheme;
