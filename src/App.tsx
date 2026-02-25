import { useCartStore } from "./store/cartStore";
import { useState } from "react";
import { Header } from "./components/Header/Header";
import { Cart } from "./components/Cart/Cart";
import { Routes, Route } from "react-router-dom";
import { Shop } from "./pages/Shop/Shop";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { Exclusives } from "./pages/Exclusives/Exclusives";
import { Offers } from "./pages/Offers/Offers";
import { Footer } from "./components/Footer/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollUpButton } from "./components/ScrollUpButton/ScrollUpButton";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const cart = useCartStore((state) => state.cart);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <ScrollToTop />
      <Header
        cartItemsCount={totalItems}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <main>
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/exclusives" element={<Exclusives />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      <ScrollUpButton />
      <Cart isOpen={isCartOpen} onCloseCart={() => setIsCartOpen(false)} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #00f6ff",
            padding: "16px",
          },
          success: {
            iconTheme: {
              primary: "#00f6ff",
              secondary: "#1e293b",
            },
          },
        }}
      />
      <Footer />
    </div>
  );
}

export default App;
