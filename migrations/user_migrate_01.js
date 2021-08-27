//tao table user voi nhung cot nhu duoi

"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            role: {
                type: Sequelize.ENUM("admin", "customer"),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        }).then(() => {
            return queryInterface.addIndex("users", ["id"])
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("users");
    },
};