import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { mockProducts } from "../../data/products";
import { Hero } from "../../components/Hero/Hero";
import { Filters } from "../../components/Filters/Filters";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useCartStore } from "../../store/cartStore";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import styles from "./Shop.module.css";

export function Shop() {
  const addToCart = useCartStore((state) => state.addToCart);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const collectionsParam = searchParams.get("collections");
  const selectedCollections = collectionsParam
    ? collectionsParam.split(",")
    : [];
  const [visibleCount, setVisibleCount] = useState(8);

  const minParam = searchParams.get("min");
  const maxParam = searchParams.get("max");
  const minPrice = minParam !== null ? Number(minParam) : 0;
  const maxPrice = maxParam !== null ? Number(maxParam) : 100;
  const priceRange: [number, number] = [minPrice, maxPrice];

  useEffect(() => {
    setVisibleCount(8);
  }, [collectionsParam, minParam, maxParam, searchQuery]);

  const filteredProducts = mockProducts.filter((product) => {
    const isWithinPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const isWithinCollection =
      selectedCollections.length === 0 ||
      selectedCollections.includes(product.collection);

    return isWithinPrice && isWithinCollection && matchesSearch;
  });
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleCollectionChange = (collectionName: string) => {
    setSearchParams((prev) => {
      let newCollections = [...selectedCollections];
      if (newCollections.includes(collectionName)) {
        newCollections = newCollections.filter(
          (name) => name !== collectionName,
        );
      } else {
        newCollections.push(collectionName);
      }

      if (newCollections.length > 0) {
        prev.set("collections", newCollections.join(","));
      } else {
        prev.delete("collections");
      }
      return prev;
    });
  };

  const handlePriceChange = (value: [number, number]) => {
    setSearchParams((prev) => {
      prev.set("min", value[0].toString());
      prev.set("max", value[1].toString());
      return prev;
    });
  };

  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

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
              onPriceChange={handlePriceChange}
              onCollectionChange={handleCollectionChange}
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
