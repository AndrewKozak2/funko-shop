import styles from "./Header.module.css";

interface HeaderProps {
  cartItemsCount: number;
  onOpenCart: () => void;
}
export function Header({ cartItemsCount, onOpenCart }: HeaderProps) {
  return (
    <div className={styles.header}>
      <h1>Funko Pop Store</h1>
      <div>
        <button onClick={onOpenCart}>{cartItemsCount}</button>
      </div>
    </div>
  );
}
