const router = require("express").Router();
const controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const upload = require("../middlewares/upload");

router.get(
  "/unit/my",
  authentication,
  authorization("owner"),
  controller.unitController.getUnitOwner
);

router.get(
  "/unit/my/:id",
  authentication,
  authorization("owner"),
  controller.unitController.getUnitOwnerById
);

router.get("/unit", controller.unitController.getUnit);

router.get("/unit/:id", controller.unitController.getUnitById);

router.post(
  "/unit",
  authentication,
  authorization("owner"),
  upload.array("unit_photo"),
  controller.unitController.createUnit
);

router.patch(
  "/unit/:id",
  authentication,
  authorization("owner"),
  upload.array("unit_photo"),
  controller.unitController.updateUnit
);

router.delete(
  "/unit/:id",
  authentication,
  authorization("owner"),
  controller.unitController.deletUnit
);

module.exports = router;
