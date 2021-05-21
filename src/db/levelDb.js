const level = require("level");
const sublevel = require("level-sublevel");
/**
 * LevelDb 操作类
 */
class LevelDb {
    /**
     * 构造函数
     * @param {*} dbPath  数据库文件路径
     * @param {*} options  配置项
     */
    constructor(dbPath, options = {}) {
        this.options = options;
        this.db = sublevel(level(dbPath, { valueEncoding: "json" }));
    }
    /**
     * 新增或者更新数据
     * @param {*} key
     * @param {*} value
     * @param {*} callback
     */
    put(key, value, callback) {
        if (key && value) {
            this.db.put(key, value, (error) => {
                callback(error);
            });
        } else {
            callback("no key or value");
        }
    }
    get(key, callback) {
        if (key) {
            this.db.get(key, (error, value) => {
                callback(error, value);
            });
        } else {
            callback("no key", key);
        }
    }
    delete(key, callback) {
        if (key) {
            this.db.del(key, (error) => {
                callback(error);
            });
        } else {
            callback("no key");
        }
    }
    batch(arr, callback) {
        if (Array.isArray(arr)) {
            var batchList = [];
            arr.forEach(item);
            {
                var listMember = {};
                if (item.hasOwnProperty("type")) {
                    listMember.type = item.type;
                }
                if (item.hasOwnProperty("key")) {
                    listMember.key = item.key;
                }
                if (item.hasOwnProperty("value")) {
                    listMember.value = item.value;
                }
                if (
                    listMember.hasOwnProperty("type") &&
                    listMember.hasOwnProperty("key") &&
                    listMember.hasOwnProperty("value")
                ) {
                    batchList.push(listMember);
                }
            }
            if (batchList && batchList.length > 0) {
                this.db.batch(batchList, (error) => {
                    callback(error, batchList);
                });
            } else {
                callback("array Membre format error");
            }
        } else {
            callback("not array");
        }
    }
    find(find, callback) {
        var option = {
            keys: true,
            values: true,
            revers: false,
            limit: 20,
            fillCache: true,
        };
        if (!find) {
            return callback("nothing", null);
        } else {
            if (find.prefix) {
                option.start = find.prefix;
                option.end =
                    find.prefix.substring(0, find.prefix.length - 1) +
                    String.fromCharCode(
                        find.prefix[find.prefix.length - 1].charCodeAt() + 1
                    );
            }

            option.limit = find.limit || 10;

            const res = [];
            this.db
                .createReadStream(option)
                .on("data", (data) => {
                    res.push(data.value);
                })
                .on("error", (err) => {})
                .on("close", () => {
                    callback(null, res);
                })
                .on("end", () => {
                    //callback(null,res)
                    //return callback(null, Date.now());
                });
        }
    }
}
module.exports = LevelDb;
