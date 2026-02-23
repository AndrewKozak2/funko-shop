import { useCartStore } from "./store/cartStore";
import { useState } from "react";
import { Header } from "./components/Header/Header";
import { Cart } from "./components/Cart/Cart";
import { Routes, Route } from "react-router-dom";
import { Shop } from "./pages/Shop";
import { ProductPage } from "./pages/ProductPage";
import "./App.css";

function App() {
  const cart = useCartStore((state) => state.cart);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Header
        cartItemsCount={totalItems}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <main>
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      <Cart isOpen={isCartOpen} onCloseCart={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
