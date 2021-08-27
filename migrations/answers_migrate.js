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
            question_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            right_answer: {
                allowNull: false,
                type: Sequelize.INTEGER,
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