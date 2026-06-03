const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split("Bearer ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "access denied. token is missing.",
        data: null,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: "invalid token",
      data: null,
    });
  }
};

module.exports = authentication;
