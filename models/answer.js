
"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/create_connect");

// tao model users voi cac cot nhu ben duoi
let User = sequelize.define("answer", {
    description: Sequelize.STRING,
    question_id: Sequelize.INTEGER,
    right_answer: Sequelize.INTEGER

}, {
    tableName: "answer",
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
    answer,
};