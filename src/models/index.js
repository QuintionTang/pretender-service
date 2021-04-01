"use strict";

const Administrators = require("./administrators");
class Models {
    constructor() {
        this.administrators = new Administrators();
    }
}
module.exports = Models;
