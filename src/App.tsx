import { useCart } from "./hooks/useCart";
import { mockProducts } from "./data/products";
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

  return (
    <div>
      <h1>Funko Pop Store</h1>
      <div className="product-grid">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
        <Cart
          cartItems={cart}
          onRemoveItem={removeFromCart}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          onCheckout={clearCart}
        />
      </div>
    </div>
  );
}

export default App;
