let Sequelize = require("sequelize");

let sequelize = new Sequelize("questionare", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;