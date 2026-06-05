const router = require("express").Router();
const controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/detail-unit", controller.detailUnitController.getDetailUnit);

router.get(
  "/detail-unit/:id",
  controller.detailUnitController.getDetailUnitById
);

router.post(
  "/detail-unit/:unitId",
  authentication,
  authorization("owner"),
  controller.detailUnitController.createDetailUnit
);

router.patch(
  "/detail-unit/:id",
  authentication,
  authorization("owner"),
  controller.detailUnitController.updateDetailUnit
);

router.delete(
  "/detail-unit/:id",
  authentication,
  authorization("owner"),
  controller.detailUnitController.deleteDetailUnit
);

module.exports = router;
