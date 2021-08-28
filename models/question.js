
"use strict";

let Sequelize = require("sequelize");
let sequelize = require("../config/create_connect");

let { Answer } = require("./answer")

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
// Question.hasMany(Answer, {
//     foreignKey: "question_id"
// });
// Answer.belongsTo(Question, {
//     foreignKey: "question_id",
//     as: "questions"
// })


module.exports = {
    Question,
};