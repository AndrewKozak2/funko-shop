const User = require("../models/User");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User with this email already exists");
  }
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();
  const codeExpires = new Date(Date.now() + 10 * 60 * 1000);

  const newUser = new User({
    name,
    email,
    password,
    verificationCode,
    codeExpires,
    isVerified: false,
  });
  await newUser.save();

  console.log(`[DEV MODE] Код для ${email}: ${verificationCode}`);

  try {
    await sendEmail(email, verificationCode);
  } catch (emailError) {
    console.error("Email send failed:", emailError.message);
  }

  res.status(201).json({ message: "User registered successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    if (!user.isVerified) {
      res.status(403);
      throw new Error("Please verify your email first");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const verify = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.verificationCode !== code) {
    res.status(400);
    throw new Error("Invalid verification code");
  }

  if (user.codeExpires < new Date()) {
    res.status(400);
    throw new Error("Verification code has expired. Please register again.");
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  user.codeExpires = undefined;
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    message: "Email verified successfully!",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res
      .status(200)
      .json({ message: "If an account exists, a reset code was sent." });
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetPasswordCode = resetCode;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  // const emailSubject = "Password Reset Code - Funko Shop";
  //  const emailMessage = `Your password reset code is: ${resetCode}. It is valid for 15 minutes.`;

  await sendEmail(user.email, resetCode, "reset");
  res
    .status(200)
    .json({ message: "If an account exists, a reset code was sent." });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.resetPasswordCode !== resetCode) {
    res.status(400);
    throw new Error("Invalid reset code");
  }

  if (Date.now() > user.resetPasswordExpires) {
    res.status(400);
    throw new Error("Reset code has expired. Please request a new one.");
  }

  user.password = newPassword;
  user.resetPasswordCode = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.status(200).json({ message: "Password successfully reset" });
});

const updateUser = asyncHandler(async (req, res) => {
  const { newName } = req.body;
  if (!newName) {
    res.status(400);
    throw new Error("New name is required");
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { name: newName },
    { new: true },
  ).select("-password");

  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({
    message: "Profile successfully updated",
    user: updatedUser,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  await Order.updateMany(
    { "customer.email": req.user.email },
    {
      $set: {
        "customer.email": "deleted@user.com",
        "customer.name": "Deleted User",
        "customer.address": "Deleted Address",
        "customer.phone": "0000000000",
      },
    },
  );
  const deleteUser = await User.findByIdAndDelete(req.user._id);
  if (!deleteUser) {
    res.status(404);
    throw new Error("User not found and could not be deleted");
  }
  res.json({ message: "Account deleted successfully" });
});

module.exports = {
  register,
  login,
  verify,
  forgotPassword,
  resetPassword,
  updateUser,
  deleteUser,
};
