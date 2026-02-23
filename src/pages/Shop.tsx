import { useSearchStore } from "../store/searchStore";
import { useState } from "react";
import { mockProducts } from "../data/products";
import { Hero } from "../components/Hero/Hero";
import { Filters } from "../components/Filters/Filters";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { useCartStore } from "../store/cartStore";

export function Shop() {
  const addToCart = useCartStore((state) => state.addToCart);
  const searchQuery = useSearchStore((state) => state.searchQuery);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

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

  return (
    <>
      <Hero />
      <div className="container">
        <div className="shop-layout">
          <aside>
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
          <main className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </main>
        </div>
      </div>
    </>
  );
}
