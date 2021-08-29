"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("administrators", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            add_time: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            last_login: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            login_ip: {
                type: Sequelize.STRING,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("administrators");
    },
};
