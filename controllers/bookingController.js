const { Booking } = require("../db/models");
const { Unit } = require("../db/models");

const createTenantBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const unitId = req.params.unitId;
    const bookingStatus = "pending";
    const {
      booking_date,
      move_in_date,
      tenant_name,
      hometown,
      birth_place_date,
      gender,
    } = req.body;

    const unit = await Unit.findByPk(unitId);

    if (!unit) {
      return res.status(404).json({
        status: "failed",
        message: "unit not found",
        data: null,
      });
    }

    if (
      !booking_date ||
      !move_in_date ||
      !tenant_name ||
      !hometown ||
      !birth_place_date ||
      !gender
    ) {
      return res.status(400).json({
        status: "failed",
        message:
          "booking date, move in date, tenant name, hometown, birth_place_date, and gender are required",
        data: null,
      });
    }

    const booking = await Booking.create({
      user_id: userId,
      unit_id: unitId,
      booking_date: booking_date,
      move_in_date: move_in_date,
      tenant_name: tenant_name,
      hometown: hometown,
      birth_place_date: birth_place_date,
      gender: gender,
      booking_status: bookingStatus,
    });

    return res.status(201).json({
      status: "success",
      message: "booking created successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const getTenantBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Unit,
          as: "unit",
        },
      ],
    });
    if (!bookings) {
      return res.status(404).json({
        status: "failed",
        message: "bookings not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "bookings found",
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const getTenantBookingDetail = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: {
        booking_id: req.params.id,
        user_id: req.user.id,
      },
      include: [
        {
          model: Unit,
          as: "unit",
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "detail booking not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "detail booking found",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const updateTenantBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      where: {
        booking_id: bookingId,
        user_id: userId,
      },
    });

    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "booking not found",
        data: null,
      });
    }

    if (booking.booking_status !== "pending") {
      return res.status(400).json({
        status: "failed",
        message: "booking status is not pending",
        data: null,
      });
    }

    const {
      booking_date,
      move_in_date,
      tenant_name,
      hometown,
      birth_place_date,
      gender,
    } = req.body;

    const updateBooking = await booking.update({
      booking_date: booking_date,
      move_in_date: move_in_date,
      tenant_name: tenant_name,
      hometown: hometown,
      birth_place_date: birth_place_date,
      gender: gender,
    });

    return res.status(200).json({
      status: "success",
      message: "booking updated successfully",
      data: updateBooking,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const deleteTenantBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: {
        booking_id: req.params.id,
        user_id: req.user.id,
      },
    });

    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "booking not found",
        data: null,
      });
    }

    if (booking.booking_status !== "pending") {
      return res.status(400).json({
        status: "failed",
        message: "booking status is not pending",
        data: null,
      });
    }

    await booking.destroy();

    return res.status(200).json({
      status: "success",
      message: "booking deleted successfully",
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

// FOR OWNER

const getOwnerAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Unit,
          as: "unit",
          where: {
            user_id: req.user.id,
          },
        },
      ],
    });

    return res.status(200).json({
      status: "success",
      message: "bookings found",
      data: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const getOwnerBookingDetail = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: {
        booking_id: req.params.id,
      },
      include: [
        {
          model: Unit,
          as: "unit",
          where: {
            user_id: req.user.id,
          },
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "booking not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "booking found",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const updateStatusBooking = async (req, res) => {
  try {
    const { booking_status } = req.body;
    const booking = await Booking.findOne({
      where: {
        booking_id: req.params.id,
      },
      include: [
        {
          model: Unit,
          as: "unit",
          where: {
            user_id: req.user.id,
          },
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({
        status: "failed",
        message: "booking not found",
        data: null,
      });
    }

    const updateStatusBooking = await booking.update({
      booking_status: booking_status,
    });

    return res.status(200).json({
      status: "success",
      message: "booking status updated successfully",
      data: updateStatusBooking,
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
  createTenantBooking,
  getTenantBooking,
  getTenantBookingDetail,
  updateTenantBooking,
  deleteTenantBooking,
  getOwnerAllBooking,
  getOwnerBookingDetail,
  updateStatusBooking,
};
