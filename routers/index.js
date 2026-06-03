const router = require("express").Router();

const auhtRouter = require("./authRouter");
const paymentRouter = require("./paymentRouter");

router.use("/", auhtRouter);
router.use("/", paymentRouter);

module.exports = router;
