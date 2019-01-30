const Sequelize = require('sequelize');
const scheme = require('./scheme');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: 'db.sqlite3',
    logging: false
});

scheme(sequelize);
sequelize.sync();

module.exports = sequelize;
