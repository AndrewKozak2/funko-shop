import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../../data/products";
import { useCartStore } from "../../store/cartStore";
import { ArrowLeft } from "lucide-react";
import styles from "./ProductPage.module.css";

export function ProductPage() {
  const { id } = useParams();

  const addToCart = useCartStore((state) => state.addToCart);

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div
        className="container"
        style={{ marginTop: "50px", textAlign: "center" }}
      >
        <h2>Oops, no such figure found</h2>
      </div>
    );
  }

  return (
    <div className={`container ${styles.pageWrapper}`}>
      <Link to="/" className={styles.backButton}>
        <ArrowLeft size={20} />
        Back to Shop
      </Link>
      <div className={styles.productLayout}>
        <img
          src={product.imageUrl}
          alt={product.title}
          className={styles.image}
        />

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.collection}>Collection: {product.collection}</p>
          <p className={styles.price}>${product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className={styles.addToCartBtn}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
