const router = require("express").Router();
const controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get(
  "/payment",
  authentication,
  authorization("owner"),
  controller.paymentController.getPayment
);
router.get(
  "/payment/:id",
  authentication,
  authorization("owner"),
  controller.paymentController.getPaymentById
);
router.post(
  "/payment",
  authentication,
  authorization("owner"),
  controller.paymentController.createPayment
);
router.patch(
  "/payment/:id",
  authentication,
  authorization("owner"),
  controller.paymentController.updatePayment
);
router.delete(
  "/payment/:id",
  authentication,
  authorization("owner"),
  controller.paymentController.deletePayment
);
module.exports = router;
