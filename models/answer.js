
"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/create_connect");

// tao model users voi cac cot nhu ben duoi
let Answer = sequelize.define("answers", {
    description: Sequelize.STRING,
    questionId: Sequelize.INTEGER,
    isCorrect: Sequelize.BOOLEAN

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
    underscored: true,  //cho phep ten bien khac nhau o model va db
});

module.exports = {
    Answer,
};