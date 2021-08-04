const Router = require("express");
const administratorController = require("../controllers/administrators");

const administratorsRouter = Router();

administratorsRouter.post("/login", administratorController.login);

module.exports = administratorsRouter;
