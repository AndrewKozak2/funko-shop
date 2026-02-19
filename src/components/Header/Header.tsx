import { ShoppingCart, Search } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  cartItemsCount: number;
  onOpenCart: () => void;
}
export function Header({ cartItemsCount, onOpenCart }: HeaderProps) {
  return (
    <header className={styles.headerWrapper}>
      <div className="container">
        <div className={styles.headerContent}>
          <a className={styles.logoLink} href="/">
            <h1 className={styles.logo}>
              <span className={styles.brandAccent}>Funko</span> Pop Store
            </h1>
          </a>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Пошук..."
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
    </header>
  );
}
