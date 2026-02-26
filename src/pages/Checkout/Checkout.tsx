import React, { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

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
    clearCart();
    navigate("/");
  };

  return (
    <>
      <div>Checkout</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <button type="submit">Place Order</button>
      </form>
    </>
  );
}
