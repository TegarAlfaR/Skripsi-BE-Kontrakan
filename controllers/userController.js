const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const imagekit = require("../lib/imagekit");

const getUser = async (req, res) => {
  try {
    const user = await User.findAll();

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "user not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "user found",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: {
        user_id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "user not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "user found",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "user not found",
        data: null,
      });
    }

    const updateData = {};

    // update name
    if (req.body.name !== undefined) {
      updateData.name = req.body.name;
    }

    // update phone number
    if (req.body.phone_number !== undefined) {
      updateData.phone_number = req.body.phone_number;
    }

    // update password
    if (req.body.password !== undefined) {
      const salt = await bcrypt.genSalt(10);

      updateData.password = await bcrypt.hash(req.body.password, salt);
    }

    // update profile photo
    if (req.file) {
      const ext = req.file.originalname.split(".").pop();

      const uploadedImage = await imagekit.upload({
        file: req.file.buffer,
        fileName: `user-${Date.now()}.${ext}`,
      });

      updateData.profile_photo = uploadedImage.url;
    }

    // tidak ada data yang dikirim
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "no data provided for update",
        data: null,
      });
    }

    await user.update(updateData);

    return res.status(200).json({
      status: "success",
      message: "user updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({
        status: "failed",
        message: "status must be active or blocked",
        data: null,
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "user not found",
        data: null,
      });
    }

    // cegah admin ngeblok dirinya sendiri
    if (user.user_id === req.user.id) {
      return res.status(400).json({
        status: "failed",
        message: "you cannot change your own status",
        data: null,
      });
    }

    await user.update({
      status,
    });

    return res.status(200).json({
      status: "success",
      message: `user ${status} successfully`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

module.exports = { getUser, getUserById, updateUser, updateUserStatus };
