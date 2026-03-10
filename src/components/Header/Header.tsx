import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart,
  User,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import styles from "./Header.module.css";

interface HeaderProps {
  cartItemsCount: number;
  onOpenCart: () => void;
}

export function Header({ cartItemsCount, onOpenCart }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { user, logout } = useAuthStore();

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
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                Wishlist
              </Link>

              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className={styles.mobileLogoutBtn}
                >
                  Logout ({user.name})
                </button>
              ) : (
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
              )}
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

            <Link to="/wishlist" className={styles.actionBtn}>
              <Heart size={24} className={styles.actionIcon} />
            </Link>
            <div className={styles.authContainer}>
              {user ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <Link
                    to="/profile"
                    className={styles.actionBtn}
                    title="My Account"
                  >
                    <span className={styles.userName}>{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className={styles.actionBtn}
                    title="Logout"
                  >
                    <LogOut size={24} className={styles.actionIconLogout} />
                  </button>
                </div>
              ) : (
                <Link to="/auth" className={styles.actionBtn} title="Login">
                  <User size={24} className={styles.actionIcon} />
                </Link>
              )}
            </div>
            <div>
              <button className={styles.actionBtn} onClick={onOpenCart}>
                <ShoppingCart size={24} className={styles.actionIcon} />
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
