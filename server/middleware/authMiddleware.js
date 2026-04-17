const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const adminAuth = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey === process.env.ADMIN_SECRET) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Invalid admin key" });
  }
};

module.exports = { protect, adminAuth };
