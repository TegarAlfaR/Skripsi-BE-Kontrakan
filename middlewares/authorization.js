const authorization = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: "failed",
        message: "unauthorized",
        data: null,
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "failed",
        message: "forbidden",
        data: null,
      });
    }

    next();
  };
};

module.exports = authorization;
