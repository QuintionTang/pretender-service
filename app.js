"use strict";
const administratorsRouter = require("./src/routers/administrators");
require("./src/utils/logger.js")(2);
const pjson = require("./package.json");
const os = require("os");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const CONFIG = require("./config");

const cookieParser = require("cookie-parser");

function _version(serviceUrl) {
    const serviceInfo = {
        name: os.hostname(),
        os: os.platform(),
        os_v: os.release(),
        version: "v" + pjson.version,
    };
    console.info("   ");
    console.info("   ", "DevPoint-Pro2.local");
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
    return Object.assign(
        {
            code: code,
            message: message,
        },
        data
    );
}
const allowDomains = "*"; //如发布需改成：127.0.0.1
app.all(allowDomains, (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("origin", "127.0.0.1:4200");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,application/x-www-form-urlencoded"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    const noCheckPaths = ["/api/v1/auth/login"];
    if (req.method == "OPTIONS") {
        res.send(200);
    } else {
        if (noCheckPaths.includes(req.path)) {
            next();
        } else {
            const authInfo = _isAuth(req);
            if (authInfo && authInfo.name) {
                next();
            } else {
                res.send(401);
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
app.use("/api/v1/auth", administratorsRouter);

// 开始运行
const port = process.env.PORT || CONFIG.port;
_version(`running at http://127.0.0.1:${port}`);
app.listen(port);
