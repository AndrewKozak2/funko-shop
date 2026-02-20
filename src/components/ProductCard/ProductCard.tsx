import { type FunkoPop } from "../../types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: FunkoPop;
  onAddToCart: (item: FunkoPop) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={product.imageUrl}
        alt={product.title}
      />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.price}>${product.price}</p>
      <button className={styles.button} onClick={() => onAddToCart(product)}>
        Add to Card
      </button>
    </div>
  );
}
