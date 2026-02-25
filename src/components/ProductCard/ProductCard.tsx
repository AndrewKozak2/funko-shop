import { Link } from "react-router-dom";
import { type FunkoPop } from "../../types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: FunkoPop;
  onAddToCart: (product: FunkoPop) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className={styles.card}>
      {product.isExclusive && <span className={styles.badge}>Exclusive</span>}

      <Link to={`/product/${product.id}`} className={styles.imageContainer}>
        <img
          src={product.imageUrl}
          alt={product.title}
          className={styles.image}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.collection}>{product.collection}</p>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={styles.button}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
