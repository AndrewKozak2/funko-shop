const PromoCode = require("../models/PromoCode");
const asyncHandler = require("../utils/asyncHandler");

const getPromos = asyncHandler(async (req, res) => {
  const promoCodes = await PromoCode.find();
  res.json(promoCodes);
});

const createPromo = asyncHandler(async (req, res) => {
  const { code, discount } = req.body;

  if (!code || !discount) {
    res.status(400);
    throw new Error("Code and discount are required");
  }

  const newPromo = await PromoCode.create({
    code: code.toUpperCase(),
    discount: Number(discount),
    isActive: true,
  });

  res.status(201).json(newPromo);
});

const deletePromo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletePromoCode = await PromoCode.findByIdAndDelete(id);
  if (!deletePromoCode) {
    res.status(404);
    throw new Error("Promo Code not deleted");
  }

  res.json({ message: "Promo code deleted successfully" });
});

const applyPromo = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const promo = await PromoCode.findOne({ code });

  if (!promo) {
    res.status(400);
    throw new Error("Invalid promo code");
  }
  if (!promo.isActive) {
    res.status(400);
    throw new Error("Promo code is inactive");
  }
  res.status(200).json({
    message: "Promo code applied successfully!",
    discount: promo.discount,
  });
});

module.exports = { getPromos, createPromo, deletePromo, applyPromo };
