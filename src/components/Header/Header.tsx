import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  cartItemsCount: number;
  onOpenCart: () => void;
}

export function Header({ cartItemsCount, onOpenCart }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setSearchParams((prev) => {
      if (text) {
        prev.set("search", text);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);
  return (
    <header className={styles.headerWrapper}>
      <div className="container">
        <div className={styles.headerContent}>
          <a className={styles.logoLink} href="/">
            <h1 className={styles.logo}>
              <span className={styles.brandAccent}>Funko</span> Pop Store
            </h1>
          </a>
          <nav className={styles.navigation}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
            <Link to="/#figures" className={styles.navLink}>
              Figures
            </Link>
            <Link
              to="/exclusives"
              className={styles.navLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Exclusives
            </Link>
            <Link
              to="/offers"
              className={styles.navLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Offers
            </Link>
          </nav>
          <button
            className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerBtnOpen : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          {isMobileMenuOpen && (
            <nav className={styles.mobileNav}>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/#figures" onClick={() => setIsMobileMenuOpen(false)}>
                Figures
              </Link>
              <Link to="/exclusives" onClick={() => setIsMobileMenuOpen(false)}>
                Exclusives
              </Link>
              <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)}>
                Offers
              </Link>
            </nav>
          )}
          <div className={styles.actions}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search figures..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
              <Search size={20} className={styles.searchIcon} />
            </div>

            <div>
              <button className={styles.cartBtn} onClick={onOpenCart}>
                <ShoppingCart size={24} className={styles.shopingCart} />
                {cartItemsCount > 0 && (
                  <span className={styles.badge}>{cartItemsCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
