import { type FunkoPop } from "../../types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: FunkoPop;
  onAddToCart: (item: FunkoPop) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <h3>{product.title}</h3>
      <img
        className={styles.image}
        src={product.imageUrl}
        alt={product.title}
      />
      <p className={styles.price}>Ціна:{product.price}</p>
      {product.isExclusive && <span className={styles.badge}>Exclusive</span>}
      <button className={styles.button} onClick={() => onAddToCart(product)}>
        Додати в кошик
      </button>
    </div>
  );
}
