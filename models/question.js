
"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/create_connect");

let { answers } = require("./answer")

// tao model question voi cac cot nhu ben duoi
let Question = sequelize.define("questions", {
    description: Sequelize.STRING
},
    {
        tableName: "questions",
        indexes: [
            {
                unique: true,
                fields: ["id"],
            },
        ],
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

//Relationships
// Question.hasMany(answers, {
//     as: "answers",
//     foreignKey: "questionId",
// });


module.exports = {
    Question,
};