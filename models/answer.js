
"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/create_connect");

// tao model users voi cac cot nhu ben duoi
let answer = sequelize.define("answers", {
    description: Sequelize.STRING,
    questionId: Sequelize.INTEGER,
    isCorrect: Sequelize.INTEGER

}, {
    tableName: "answers",
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