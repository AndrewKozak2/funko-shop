import { useParams, useNavigate } from "react-router-dom";
import { mockProducts } from "../../data/products";
import { useCartStore } from "../../store/cartStore";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import styles from "./ProductPage.module.css";

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const relatedProducts = mockProducts
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className={`container ${styles.pageWrapper}`}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <ArrowLeft size={20} />
        Go Back
      </button>
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
            onClick={() => {
              addToCart(product);
              toast.success("Product added to cart!");
            }}
            className={styles.addToCartBtn}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>You Might Also Like</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
