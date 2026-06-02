const router = require("express").Router();
const controller = require("../controllers");

router.post("/auth/login", controller.authController.login);

module.exports = router;
