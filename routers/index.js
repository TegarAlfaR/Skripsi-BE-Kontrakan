const router = require("express").Router();

const auhtRouter = require("./authRouter");
const paymentRouter = require("./paymentRouter");
const unitRouter = require("./unitRouter");
const detailUnitRouter = require("./detailUnitRouter");
const bookingRouter = require("./bookingRouter");

router.use("/", auhtRouter);
router.use("/", paymentRouter);
router.use("/", unitRouter);
router.use("/", detailUnitRouter);
router.use("/", bookingRouter);

module.exports = router;
