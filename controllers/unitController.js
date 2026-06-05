const { Unit } = require("../db/models");
const { Detail_unit } = require("../db/models");
const imagekit = require("../lib/imagekit");

// untuk semua user
const getUnit = async (req, res) => {
  try {
    const units = await Unit.findAll({
      include: [
        {
          model: Detail_unit,
          as: "detail_unit",
        },
      ],
    });

    if (!units) {
      return res.status(404).json({
        status: "failed",
        message: "units not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "units found",
      data: units,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

// untuk semua user
const getUnitById = async (req, res) => {
  try {
    const unitId = req.params.id;

    const unit = await Unit.findByPk(unitId, {
      include: [
        {
          model: Detail_unit,
          as: "detail_unit",
        },
      ],
    });

    if (!unit) {
      return res.status(404).json({
        status: "failed",
        message: "unit with id " + unitId + " not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "unit found",
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const getUnitOwner = async (req, res) => {
  try {
    const units = await Unit.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [
        {
          model: Detail_unit,
          as: "detail_unit",
        },
      ],
    });

    if (!units) {
      return res.status(404).json({
        status: "failed",
        message: "units not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "units found",
      data: units,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "tes",
      data: null,
    });
  }
};

const getUnitOwnerById = async (req, res) => {
  try {
    const unitId = req.params.id;

    const unit = await Unit.findOne({
      where: {
        unit_id: unitId,
        user_id: req.user.id,
      },
      include: [
        {
          model: Detail_unit,
          as: "detail_unit",
        },
      ],
    });

    if (!unit) {
      return res.status(404).json({
        status: "failed",
        message: "unit with id " + unitId + " not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "unit found",
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const createUnit = async (req, res) => {
  try {
    const userId = req.user.id;
    const unitFiles = req.files || [];

    const uploadedImageUrl = [];

    for (const file of unitFiles) {
      const ext = file.originalname.split(".").pop();

      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `unit-${Date.now()}.${ext}`,
      });

      uploadedImageUrl.push(uploadedImage.url);
    }

    const {
      unit_name,
      rental_price,
      phone_number,
      total_units,
      unit_availability,
      location,
    } = req.body;

    if (
      !unit_name ||
      !rental_price ||
      !phone_number ||
      !total_units ||
      !unit_availability ||
      !location
    ) {
      return res.status(400).json({
        status: "failed",
        message:
          "unit_name, rental_price, phone_number, total_units, unit_availability, location are required",
        data: null,
      });
    }

    const newUnit = await Unit.create({
      user_id: userId,
      unit_name,
      rental_price,
      phone_number,
      unit_photo: uploadedImageUrl,
      total_units,
      unit_availability,
      location,
    });

    return res.status(201).json({
      status: "success",
      message: "unit created successfully",
      data: newUnit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const updateUnit = async (req, res) => {
  try {
    const unitId = req.params.id;

    const unit = await Unit.findOne({
      where: {
        unit_id: unitId,
        user_id: req.user.id,
      },
    });

    if (!unit) {
      return res.status(404).json({
        status: "failed",
        message: `unit with id ${unitId} not found`,
        data: null,
      });
    }

    const updateData = {};

    if (req.body.unit_name !== undefined) {
      updateData.unit_name = req.body.unit_name;
    }

    if (req.body.rental_price !== undefined) {
      updateData.rental_price = Number(req.body.rental_price);
    }

    if (req.body.phone_number !== undefined) {
      updateData.phone_number = req.body.phone_number;
    }

    if (req.body.total_units !== undefined) {
      updateData.total_units = Number(req.body.total_units);
    }

    if (req.body.unit_availability !== undefined) {
      updateData.unit_availability = Number(req.body.unit_availability);
    }

    if (req.body.location !== undefined) {
      updateData.location = req.body.location;
    }

    // update foto jika ada file baru
    if (req.files && req.files.length > 0) {
      const uploadedImageUrl = [];

      for (const file of req.files) {
        const ext = file.originalname.split(".").pop();

        const uploadedImage = await imagekit.upload({
          file: file.buffer,
          fileName: `unit-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}.${ext}`,
        });

        uploadedImageUrl.push(uploadedImage.url);
      }

      updateData.unit_photo = uploadedImageUrl;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "no data provided for update",
        data: null,
      });
    }

    await unit.update(updateData);

    return res.status(200).json({
      status: "success",
      message: "unit updated successfully",
      data: unit,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const deletUnit = async (req, res) => {
  try {
    const unitId = req.params.id;

    const unit = await Unit.findOne({
      where: {
        unit_id: unitId,
        user_id: req.user.id,
      },
    });

    if (!unit) {
      return res.status(404).json({
        status: "failed",
        message: `unit with id ${unitId} not found`,
        data: null,
      });
    }

    await unit.destroy();

    return res.status(200).json({
      status: "success",
      message: "unit deleted successfully",
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
  getUnit,
  getUnitById,
  createUnit,
  updateUnit,
  deletUnit,
  getUnitOwner,
  getUnitOwnerById,
};
