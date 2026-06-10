const router = require("express").Router();
const controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

// FOR TENANT

router.get(
  "/booking",
  authentication,
  authorization("tenant"),
  controller.bookingController.getTenantBooking
);

router.get(
  "/booking/:id",
  authentication,
  authorization("tenant"),
  controller.bookingController.getTenantBookingDetail
);

router.post(
  "/booking/:unitId",
  authentication,
  authorization("tenant"),
  controller.bookingController.createTenantBooking
);

router.patch(
  "/booking/:id",
  authentication,
  authorization("tenant"),
  controller.bookingController.updateTenantBooking
);

router.delete(
  "/booking/:id",
  authentication,
  authorization("tenant"),
  controller.bookingController.deleteTenantBooking
);

// FOR OWNER

router.get(
  "/owner/booking",
  authentication,
  authorization("owner"),
  controller.bookingController.getOwnerAllBooking
);

router.get(
  "/owner/booking/:id",
  authentication,
  authorization("owner"),
  controller.bookingController.getOwnerBookingDetail
);

router.patch(
  "/owner/booking/:id",
  authentication,
  authorization("owner"),
  controller.bookingController.updateStatusBooking
);

module.exports = router;
