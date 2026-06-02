const router = require("express").Router();

const auhtRouter = require("./authRouter");

router.use("/", auhtRouter);

module.exports = router;
