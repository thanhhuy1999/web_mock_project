
"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/create_connect");

// tao model users voi cac cot nhu ben duoi
let User = sequelize.define("users", {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    role: {
        type: Sequelize.ENUM("admin", "customer"),  //chi cho phep chon 1 trong 2
    },
}, {
    tableName: "users",
    indexes: [
        {
            unique: true,
            fields: ["id"],
        },
    ],
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
});

module.exports = {
    User,
};