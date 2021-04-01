"use strict";
require("./src/utils/logger.js")(2);
const pjson = require("./package.json");
const os = require("os");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");
const CONFIG = require("./config");
const Models = require("./src/models/index");
const cookieParser = require("cookie-parser");

const models = new Models();

function _version(serviceUrl) {
    const serviceInfo = {
        name: os.hostname(),
        os: os.platform(),
        os_v: os.release(),
        version: "v" + pjson.version,
    };
    console.info("   ");
    console.info("   ", serviceInfo.name);
    console.success("   ", serviceInfo.version);
    console.success("   ", serviceUrl);
    console.info("   ");
    console.info("   ");
}

function _isAuth(req) {
    if (req.cookies) {
        return req.cookies.auth;
    } else {
        return false;
    }
}
function _setAuth(res, userinfo) {
    res.cookie("auth", userinfo);
}
function _formatResponse(code, message, data) {
    return _.assign(
        {
            code: code,
            message: message,
        },
        data
    );
}
const allow_domain = "*"; //如发布需改成：127.0.0.1
app.all(allow_domain, function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("origin", "127.0.0.1:4200");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,application/x-www-form-urlencoded"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    const _nocheck = ["/api/v1/auth/login"];
    if (req.method == "OPTIONS") {
        res.send(200);
    } else {
        if (_.indexOf(_nocheck, req.path) >= 0) {
            next();
        } else {
            const is_auth = _isAuth(req);
            if (is_auth && is_auth.name) {
                next();
            } else {
                _setAuth(res, {
                    username: "administrator",
                });
                next();
            }
        }
    }
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// 用户登录验证模块
app.get("/api/v1/auth", function (req, res) {
    const is_auth = _isAuth(req);
    if (is_auth && is_auth.name) {
        return res.status(200).send(
            _formatResponse(0, "成功", {
                data: is_auth,
            })
        );
    } else {
        return res.status(200).send(_formatResponse(20000, "未登录"));
    }
});

app.post("/api/v1/auth/login", function (req, res) {
    const login_result = models.administrators.login(req.body);
    if (login_result) {
        _setAuth(res, login_result);
        return res.status(200).send(
            _formatResponse(0, "成功", {
                data: login_result,
            })
        );
    } else {
        return res
            .status(200)
            .send(_formatResponse(400, "用户名或者密码错误！"));
    }
});
// 开始运行
const port = process.env.PORT || CONFIG.port;
_version(`running at http://127.0.0.1:${port}`);
app.listen(port);
