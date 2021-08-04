"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class administrators extends Model {}
    administrators.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            add_time: DataTypes.INTEGER,
            last_login: DataTypes.INTEGER,
            username: DataTypes.STRING,
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
