import { mockProducts } from "../../data/products";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useCartStore } from "../../store/cartStore";
import { Crown } from "lucide-react";
import styles from "./Exclusives.module.css";

export function Exclusives() {
  const addToCart = useCartStore((state) => state.addToCart);
  const exclusiveProducts = mockProducts.filter(
    (product) => product.isExclusive === true,
  );
  return (
    <div className="container" style={{ padding: "40px 20px 100px 20px" }}>
      <div className={styles.banner}>
        <Crown size={40} className={styles.icon} />
        <h1 className={styles.pageTitle}>Exclusive Figures</h1>
      </div>
      {exclusiveProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Oops! All exclusives are sold out! 🏃‍♂️💨</h2>
          <p>Check back later for new rare drops.</p>
        </div>
      ) : (
        <div className={`product-grid ${styles.centeredGrid}`}>
          {exclusiveProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
