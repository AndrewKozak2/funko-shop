import { useSearchStore } from "../store/searchStore";
import { useState, useEffect } from "react";
import { mockProducts } from "../data/products";
import { Hero } from "../components/Hero/Hero";
import { Filters } from "../components/Filters/Filters";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { useCartStore } from "../store/cartStore";
import { Newsletter } from "../components/Newsletter/Newsletter";
import styles from "./Shop.module.css";

export function Shop() {
  const addToCart = useCartStore((state) => state.addToCart);
  const searchQuery = useSearchStore((state) => state.searchQuery);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setVisibleCount(8);
  }, [priceRange, selectedCollections, searchQuery]);

  const filteredProducts = mockProducts.filter((product) => {
    const isWithinPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const isWithinCollection =
      selectedCollections.length === 0 ||
      selectedCollections.includes(product.collection);

    const isMatchingSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return isWithinPrice && isWithinCollection && isMatchingSearch;
  });
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <div className="container">
        <div className="shop-layout">
          <aside className={styles.stickySidebar}>
            <Filters
              selectedCollection={selectedCollections}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onCollectionChange={(collectionName) => {
                setSelectedCollections((prev) =>
                  prev.includes(collectionName)
                    ? prev.filter((item) => item !== collectionName)
                    : [...prev, collectionName],
                );
              }}
            />
          </aside>
          <div className={styles.mainContent} id="figures">
            <main className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </main>
            {visibleCount < filteredProducts.length && (
              <div className={styles.loadMoreContainer}>
                <button
                  className={styles.loadMoreBtn}
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
}
