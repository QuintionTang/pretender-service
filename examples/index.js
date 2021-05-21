"use strict";
require("../src/utils/logger.js")(2);
const { dbConfig } = require("../config");

const LevelDB = require("../src/db/levelDb");
const path = require("path");
const cuid = require("cuid");
const dbHelper = new LevelDB(
    path.resolve(__dirname, dbConfig.path, dbConfig.folder)
);

// 增加用户信息
const administrators = [
    {
        name: "QuintionTang",
        email: "QuintionTang@gmail.com",
        password: "123456",
        id: "ckoyhjqbj0000mzkd1o63e31p",
    },
    {
        name: "JimGreen",
        email: "JimGreen@gmail.com",
        password: "123456",
        id: "ckoyhjqbk0001mzkdhuq9abo4",
    },
];
const keyPrefix = "administrator";
console.info("====>开始插入数据");
const administratorsKeys = [];
for (const item of administrators) {
    const uid = item.id;
    const keyName = `${keyPrefix}_${uid}`;
    item.id = uid;
    dbHelper.put(keyName, item, (error) => {
        if (error !== null) {
            administratorsKeys.push(keyName);
        }
    });
}
console.info("====>开始查找数据");
// 开始查找uid为 ckoyhjqbj0000mzkd1o63e31p 的用户信息
const findUid = "ckoyhjqbj0000mzkd1o63e31p";
const findKeyName = `${keyPrefix}_${findUid}`;
dbHelper.find(
    {
        prefix: findKeyName,
    },
    (error, result) => {
        console.info(result);
    }
);
