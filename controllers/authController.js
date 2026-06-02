const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../db/models");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "email and password are required",
        data: null,
      });
    }

    const user = await User.findOne({
      where: { email: email, status: "active" },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "failed",
        message: "invalid email or password",
        data: null,
      });
    }

    const payload = {
      id: user.user_id,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRED_IN,
    });

    return res.status(200).cookie("token", token).json({
      status: "success",
      message: "login success",
      data: {
        token,
        payload,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const register = async (req, res) => {
  try {
    const { role, name, email, password, phone_number } = req.body;

    const defaultPhoto =
      "https://ik.imagekit.io/epqufjrrv/boy.jpg?updatedAt=1732007400483";

    if (!role || !name || !email || !password || !phone_number) {
      return res.status(400).json({
        status: "failed",
        message: "role, name, email, password, phone_number are required",
        data: null,
      });
    }

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "email already exist",
        data: null,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      role,
      name,
      email,
      password: hashPassword,
      phone_number,
      profile_photo: defaultPhoto,
      status: "active",
    });

    return res.status(201).json({
      status: "success",
      message: "register success",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  login,
  register
};
