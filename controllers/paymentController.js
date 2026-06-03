const { Payment } = require("../db/models");

const createPayment = async (req, res) => {
  try {
    const { tenant_name, amount, payment_date, notes } = req.body;

    const ownerId = req.user.id;

    if (!tenant_name || !amount || !payment_date) {
      return res.status(400).json({
        status: "failed",
        message: "tenant_name, amount, payment_date are required",
        data: null,
      });
    }

    const newPayment = await Payment.create({
      user_id: ownerId,
      tenant_name,
      amount,
      payment_date,
      notes,
    });

    return res.status(201).json({
      status: "success",
      message: "payment created successfully",
      data: newPayment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { tenant_name, amount, payment_date, notes } = req.body;

    const payment = await Payment.findByPk(paymentId);

    if (!payment) {
      return res.status(404).json({
        status: "failed",
        message: "payment with id " + paymentId + " not found",
        data: null,
      });
    }

    const updatePayment = await payment.update({
      tenant_name: tenant_name,
      amount: amount,
      payment_date: payment_date,
      notes: notes,
    });

    return res.status(200).json({
      status: "success",
      message: "payment updated successfully",
      data: updatePayment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const payment = await Payment.findByPk(paymentId);

    if (!payment) {
      return res.status(404).json({
        status: "failed",
        message: "payment with id " + paymentId + " not found",
        data: null,
      });
    }

    await payment.destroy();

    return res.status(200).json({
      status: "success",
      message: "payment deleted successfully",
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

const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findAll();

    if (!payment) {
      return res.status(404).json({
        status: "failed",
        message: "payment not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "payment found",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const payment = await Payment.findByPk(paymentId);

    if (!payment) {
      return res.status(404).json({
        status: "failed",
        message: "payment with id " + paymentId + " not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "payment found",
      data: payment,
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
  createPayment,
  updatePayment,
  deletePayment,
  getPayment,
  getPaymentById,
};
