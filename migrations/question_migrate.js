// migrations/0001_initQuestion.js


//tao table question voi nhung cot nhu duoi
"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("question", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },

        }).then(() => {
            return queryInterface.addIndex("question", ["id"])
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("question");
    },
};