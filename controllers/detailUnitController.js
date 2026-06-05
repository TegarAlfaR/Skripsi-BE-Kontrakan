const { Detail_unit } = require("../db/models");
const { Unit } = require("../db/models");

const getDetailUnit = async (req, res) => {
  try {
    const detailUnit = Detail_unit.findAll();

    if (!detailUnit) {
      return res.status(404).json({
        status: "failed",
        message: "detail unit not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "detail unit found",
      data: detailUnit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const getDetailUnitById = async (req, res) => {
  try {
    const detailUnitId = req.params.id;

    const detailUnit = await Detail_unit.findByPk(detailUnitId);

    if (!detailUnit) {
      return res.status(404).json({
        status: "failed",
        message: "detail unit with id " + detailUnitId + " not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "detail unit found",
      data: detailUnit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const createDetailUnit = async (req, res) => {
  try {
    const unitId = req.params.unitId;

    const checkUnit = await Unit.findByPk(unitId);

    if (!checkUnit) {
      return res.status(404).json({
        status: "failed",
        message: "unit with id " + unitId + " not found",
        data: null,
      });
    }

    const {
      total_rooms,
      livingroom,
      bathroom,
      kitchen,
      bedroom,
      electricity_type,
      water_access,
      description,
    } = req.body;

    if (
      !total_rooms ||
      !electricity_type ||
      !water_access
    ) {
      return res.status(400).json({
        status: "failed",
        message: "all fields are required",
        data: null,
      });
    }

    const detailUnit = await Detail_unit.create({
      unit_id: unitId,
      total_rooms,
      livingroom,
      bathroom,
      kitchen,
      bedroom,
      electricity_type,
      water_access,
      description,
    });

    if (!detailUnit) {
      return res.status(404).json({
        status: "failed",
        message: "detail unit not created",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "detail unit created",
      data: detailUnit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const updateDetailUnit = async (req, res) => {
  try {
    const detailUnitId = req.params.id;
    const {
      total_rooms,
      livingroom,
      bathroom,
      kitchen,
      bedroom,
      electricity_type,
      water_access,
      description,
    } = req.body;

    const detailUnit = await Detail_unit.findByPk(detailUnitId);

    if (!detailUnit) {
      return res.status(404).json({
        status: "failed",
        message: "detail unit with id " + detailUnitId + " not found",
        data: null,
      });
    }

    const updateDetailUnit = await detailUnit.update({
      total_rooms,
      livingroom,
      bathroom,
      kitchen,
      bedroom,
      electricity_type,
      water_access,
      description,
    });

    if (!updateDetailUnit) {
      return res.status(404).json({
        status: "failed",
        message: "detail unit not updated",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "detail unit updated",
      data: updateDetailUnit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const deleteDetailUnit = async (req, res) => {
  try {
    const detailUnitId = req.params.id;

    const detailUnit = await Detail_unit.findByPk(detailUnitId);

    if (!detailUnit) {
      return res.status(404).json({
        status: "failed",
        message: "detail unit with id " + detailUnitId + " not found",
        data: null,
      });
    }

    await detailUnit.destroy();

    return res.status(200).json({
      status: "success",
      message: "detail unit deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  getDetailUnit,
  getDetailUnitById,
  createDetailUnit,
  updateDetailUnit,
  deleteDetailUnit,
};
