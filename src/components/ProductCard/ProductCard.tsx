import { type FunkoPop } from "../../types/product";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: FunkoPop;
  onAddToCart: (item: FunkoPop) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          className={styles.image}
          src={product.imageUrl}
          alt={product.title}
        />
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price}</p>
      </Link>
      <button className={styles.button} onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
