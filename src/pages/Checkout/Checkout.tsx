import React, { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Checkout.module.css";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export function Checkout() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Order successfully placed!");
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    navigate("/success", {
      state: {
        orderId: `FNK-${orderNumber}`,
        total: totalPrice.toFixed(2),
      },
    });
    clearCart();
  };
  if (cart.length === 0) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "100px 20px" }}
      >
        <h2 style={{ color: "white", marginBottom: "20px" }}>
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className={styles.submitBtn}
          style={{ width: "auto", padding: "15px 30px" }}
        >
          Go to Shop
        </button>
      </div>
    );
  }
  return (
    <div className="container" style={{ padding: "40px 20px 100px 20px" }}>
      <h1 className={styles.title}>Checkout</h1>
      <div className={styles.summaryBlock}>
        <h2 className={styles.summaryTitle}>Order Summary</h2>

        <div>
          {cart.map((item) => (
            <div key={item.product.id} className={styles.summaryItem}>
              <img
                src={item.product.imageUrl}
                alt={item.product.title}
                className={styles.summaryImage}
              />
              <div className={styles.summaryInfo}>
                <p className={styles.summaryName}>{item.product.title}</p>
                <p className={styles.summaryQty}>Qty: {item.quantity}</p>
              </div>
              <div className={styles.summaryPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className={styles.totalBlock}>
            <span className={styles.totalLabel}>Total:</span>
            <span className={styles.totalAmount}>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            className={styles.input}
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className={styles.input}
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone" className={styles.label}>
            Your Number
          </label>
          <input
            id="phone"
            type="tel"
            required
            className={styles.input}
            placeholder="+380 50 123 45 67"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="address" className={styles.label}>
            Delivery address
          </label>
          <input
            id="address"
            type="text"
            required
            className={styles.input}
            placeholder="Kyiv, Khreshchatyk st. 1, apt 2"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Place Order
        </button>
      </form>
    </div>
  );
}
