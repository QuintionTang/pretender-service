"use strict";
const { customAlphabet } = require("nanoid");
/**
 * 核心脚本库
 */
const Helper = () => {
    /**
     * 创建唯一KEY
     * @param {*} index
     * @returns
     */
    const createUniqueId = (length = 16) => {
        const createID = customAlphabet(
            "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMOPQRSTUVWXYZ",
            length
        );
        return createID();
    };
    return {
        createUniqueId,
    };
};

module.exports = Helper();
