import { useCart } from "./hooks/useCart";
import { useState } from "react";
import { mockProducts } from "./data/products";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { Cart } from "./components/Cart/Cart";
import "./App.css";

function App() {
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Header
        cartItemsCount={totalItems}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <Hero />
      <div className="container">
        <div className="product-grid">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}

          <Cart
            isOpen={isCartOpen}
            cartItems={cart}
            onRemoveItem={removeFromCart}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
            onCheckout={clearCart}
            onCloseCart={() => setIsCartOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
