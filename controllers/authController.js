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

module.exports = {
  login,
};
