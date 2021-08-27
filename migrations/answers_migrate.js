//tao table answer voi nhung cot nhu duoi

"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("answers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            questionId: {
                allowNull: false,
                //primaryKey: true,
                type: Sequelize.INTEGER,
                field: 'question_id',
            },
            isCorrect: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                field: 'is_correct',
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }).then(() => {
            return queryInterface.addIndex("answers", ["id"])
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("answers");
    },
};