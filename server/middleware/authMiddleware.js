const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select("-password");
    return next();
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const adminAuth = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];
  if (adminKey === process.env.ADMIN_SECRET) {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied. Invalid admin key.");
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied. Admins only.");
  }
};

module.exports = { protect, adminOnly, adminAuth };
