const administratorsService = require("../services/administrators");
const util = require("../utils");

class AdministratorsController {
    constructor() {}
    async login(req, res) {
        const { username, passowrd } = req.body;

        try {
            const userinfo = await administratorsService.get(username);
            if (!userinfo) {
                util.setError(200, 30004, `用户名不存在： ${username}`);
            } else {
                if (passowrd === userinfo.passowrd) {
                    // await administratorsService.update(userinfo.id);
                    util.setSuccess(200, "登录成功", userinfo);
                } else {
                    util.setError(200, 30001, `登录密码错误`);
                }
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }
}

module.exports = new AdministratorsController();
