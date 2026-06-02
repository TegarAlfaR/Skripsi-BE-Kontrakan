const router = require("express").Router();
const controller = require("../controllers");

router.post("/auth/login", controller.authController.login);
router.post("/auth/register", controller.authController.register);
module.exports = router;
