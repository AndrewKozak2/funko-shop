import { mockBundles } from "../../data/products";
import { BundleCard } from "../../components/BundleCard/BundleCard";
import { useCartStore } from "../../store/cartStore";
import { Tag } from "lucide-react";
import styles from "./Offers.module.css";

export function Offers() {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="container" style={{ padding: "40px 20px 100px 20px" }}>
      <div className={styles.header}>
        <Tag size={40} color="#ff8a00" />
        <h1 className={styles.title}>Special Offers & Bundles</h1>
      </div>

      <div className={`product-grid ${styles.centeredGrid}`}>
        {mockBundles.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
