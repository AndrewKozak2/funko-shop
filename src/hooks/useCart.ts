import { useState, useEffect } from "react";
import { type FunkoPop, type CartItem } from "../types/product";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("funco-cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("funco-cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: FunkoPop) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      const newItem = {
        product: product,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }
  };

  const handleIncreaseQuantity = (idToIncrease: string) => {
    const updatedCart = cart.map((item) => {
      if (item.product.id === idToIncrease) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (idToDecrease: string) => {
    const updatedCart = cart
      .map((item) => {
        if (item.product.id === idToDecrease) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (idToRemove: string) => {
    const filteredCart = cart.filter((item) => item.product.id !== idToRemove);
    setCart(filteredCart);
  };
  return {
    cart,
    addToCart: handleAddToCart,
    increaseQuantity: handleIncreaseQuantity,
    decreaseQuantity: handleDecreaseQuantity,
    removeFromCart: handleRemoveFromCart,
  };
}
