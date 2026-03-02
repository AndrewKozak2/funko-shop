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
  const sortParam = searchParams.get("sort") || "default";

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
  }, [collectionsParam, minParam, maxParam, searchQuery, sortParam]);

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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortParam) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

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

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      prev.set("sort", value);
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
            <div className={styles.productsHeader}>
              <span>Found: {filteredProducts.length} items</span>
              <div className={styles.sortContainer}>
                <label htmlFor="sort-select">Sort by: </label>
                <select
                  id="sort-select"
                  value={sortParam}
                  onChange={handleSortChange}
                  className={styles.sortSelect}
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>
            </div>
            {filteredProducts.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className={styles.noResults}>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query.</p>
                <button
                  className={styles.resetBtn}
                  onClick={() => setSearchParams({})}
                >
                  Clear all filters
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
