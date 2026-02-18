import { useState } from "react";
import { mockProducts } from "./data/products";
import { type FunkoPop, type CartItem } from "./types/product";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { Cart } from "./components/Cart/Cart";
import "./App.css";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

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

  return (
    <div>
      <h1>Funko Pop Store</h1>
      <div className="product-grid">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
        <Cart
          cartItems={cart}
          onRemoveItem={handleRemoveFromCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
        />
      </div>
    </div>
  );
}

export default App;
