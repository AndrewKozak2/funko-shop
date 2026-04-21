const Order = require("../models/Order");
const asyncHandler = require("../utils/asyncHandler");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const userEmail = req.params.email;
  const userOrders = await Order.find({ "customer.email": userEmail }).sort({
    createdAt: -1,
  });
  if (req.user.email !== req.params.email && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You can only see your own orders");
  }
  res.json(userOrders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  const updateOrder = await Order.findByIdAndUpdate(
    orderId,
    { status: status },
    { returnDocument: "after" },
  );
  if (!updateOrder) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(updateOrder);
});

const createOrder = asyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);
  const saveOrder = await newOrder.save();
  console.log("New Order Created", saveOrder);
  res.status(201).json(saveOrder);
});

module.exports = { getOrders, getUserOrders, updateOrderStatus, createOrder };
