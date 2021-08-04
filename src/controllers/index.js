"use strict";
const { dbConfig } = require("../../config");

const LevelDB = require("../db/levelDb");
const path = require("path");
const Administrators = require("./administrators");
class Models {
    constructor() {
        this.dbHelper = new LevelDB(
            path.resolve(__dirname, dbConfig.path, dbConfig.folder)
        );
        this.administrators = new Administrators(this.dbHelper);
    }
}
module.exports = Models;
