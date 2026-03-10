const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const Order = require("./models/Order");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected successfully!"))
  .catch((err) => console.log(" MongoDB connection error:", err));

const adminAuth = (req, res, next) => {
  const password = req.headers["x-admin-key"];
  const correctPassword = process.env.ADMIN_SECRET;

  if (!password || password !== correctPassword) {
    return res.status(403).json({ message: "Access denied: Invalid password" });
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Funko Store API is running...");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.patch("/orders/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true },
    );
    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updateOrder);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saveOrder = await newOrder.save();
    console.log("New Order Created", saveOrder);
    res.status(201).json(saveOrder);
  } catch (error) {
    console.error("Order Save Error", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
