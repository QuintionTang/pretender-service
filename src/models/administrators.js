"use strict";
const _ = require("lodash");

class Admin {
    constructor(dbHelper) {
        this.dbkey = "administrators";
        this._roles = [
            {
                id: 1,
                name: "超级管理员",
            },
            {
                id: 2,
                name: "内容管理员",
            },
        ];
        this._admin = [
            {
                id: 1,
                username: "administrator",
                password: "devpoint",
                email: "QuintionTang@gmail.com",
                role_id: 1,
                created_at: "2021-03-24 13:33:52",
                updated_at: "2021-03-26 14:55:56",
            },
        ];
    }

    _getInfo(name, password) {
        return _.assign(
            {},
            {
                name: name,
                password: password,
            }
        );
    }
    _getRoleName(roleId) {
        const role_info = _.find(this._roles, (val) => {
            return val.id == roleId;
        });
        return role_info.name;
    }
    isExist(name) {
        return _.find(this._admin, (val) => {
            return val.name == name;
        });
    }
    get(adminId) {
        return _.find(this._admin, (val) => {
            return val.id == adminId;
        });
    }
    login(userinfo) {
        const result = _.find(this._admin, (val) => {
            return (
                val.username === userinfo.username &&
                val.password === userinfo.password
            );
        });
        return result;
    }
    list(querys) {
        let result = _.slice(this._admin, 0);

        const offset = querys.offset || 0;
        const limit = querys.limit || 10;
        const orderby = querys.orderby || "id";
        const sort = querys.sort || "desc";

        if (querys.role_id && querys.role_id > 0) {
            result = _.filter(result, function (o) {
                return o.role_id == querys.role_id;
            });
        }

        if (querys.name && querys.name) {
            result = _.filter(result, function (o) {
                return o.name == querys.name;
            });
        }
        const new_list = [];
        if (result.length > 0) {
            _.forEach(result, (val) => {
                val.role_name = this._getRoleName(val.role_id);
                new_list.push(val);
            });
        }
        result = _.orderBy(new_list, [orderby], [sort]);
        return {
            offset: offset,
            limit: limit,
            total_count: result.length,
            admins: result,
        };
    }
}

module.exports = Admin;
