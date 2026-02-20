import { useCart } from "./hooks/useCart";
import { useState } from "react";
import { mockProducts } from "./data/products";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { Filters } from "./components/Filters/Filters";
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
        <div className="shop-layout">
          <aside>
            <Filters />
          </aside>
          <main className="product-grid">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </main>
        </div>
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
  );
}

export default App;
