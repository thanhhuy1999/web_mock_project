let Sequelize = require("sequelize"); //import sequelize

// tao db questionare bang sequelize
let sequelize = new Sequelize("questionare", "root", "", {
    host: "localhost",
    dialect: "mysql"
});


//xuat module sequenlize
module.exports = sequelize;