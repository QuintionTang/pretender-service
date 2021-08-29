"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class administrators extends Model {}
    administrators.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                unique: true,
                autoIncrement: true,
            },
            add_time: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            last_login: DataTypes.INTEGER,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            login_ip: DataTypes.STRING,
        },
        {
            sequelize,
            indexes: [
                {
                    unique: true,
                    fields: ["id"],
                },
            ],
            freezeTableName: true,
            timestamps: false, // 是否自动添加时间戳createAt，updateAt
            modelName: "administrators",
        }
    );
    return administrators;
};
