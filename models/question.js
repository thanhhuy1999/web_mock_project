
"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/create_connect");

// tao model question voi cac cot nhu ben duoi
let Question = sequelize.define("question", {
    description: Sequelize.STRING
},
    {
        tableName: "question",
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
    Question,
};