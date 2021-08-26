// src/users/userModel.js

"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/create_connect");

// table [extension]
let User = sequelize.define("users", {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    role: {
        type: Sequelize.ENUM("admin", "customer"),
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