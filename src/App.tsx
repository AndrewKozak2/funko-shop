import { useState } from "react";
import { mockProducts } from "./data/products";
import { type FunkoPop } from "./types/product";
import { ProductCard } from "./components/ProductCard/ProductCard";
import "./App.css";

function App() {
  const [cart, setCart] = useState<FunkoPop[]>([]);

  const handleAddToCard = (product: FunkoPop) => {
    setCart([...cart, product]);
    console.log("Товарів у кошику:", cart.length + 1);
  };

  return (
    <div>
      <h1>Funko Pop Store</h1>
      <div className="product-grid">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCard}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
