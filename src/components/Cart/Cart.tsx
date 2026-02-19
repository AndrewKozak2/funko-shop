import { type CartItem } from "../../types/product";
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import styles from "./Cart.module.css";

interface CartProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onRemoveItem: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onCheckout: () => void;
  onCloseCart: () => void;
}

export function Cart({
  cartItems,
  isOpen,
  onRemoveItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCheckout,
  onCloseCart,
}: CartProps) {
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);
  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onCloseCart}
      />
      <div
        className={`${styles.container} ${isOpen ? styles.containerOpen : ""}`}
      >
        <div className={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={24} />
            <h2>Кошик</h2>
          </div>
          <button className={styles.closeButton} onClick={onCloseCart}>
            <X size={24} />
          </button>
        </div>
        <ul className={styles.cartList}>
          {cartItems.length === 0 && (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} opacity={0.2} />
              <p>Тут поки що порожньо...</p>
            </div>
          )}

          {cartItems.map((item) => (
            <li key={item.product.id} className={styles.cartItem}>
              <div className={styles.itemInfo}>
                <span className={styles.itemTitle}>{item.product.title}</span>
                <span className={styles.itemPrice}>${item.product.price}</span>
              </div>

              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityButton}
                  onClick={() => onDecreaseQuantity(item.product.id)}
                >
                  <Minus size={16} />
                </button>

                <span className={styles.quantityText}>{item.quantity}</span>

                <button
                  className={styles.quantityButton}
                  onClick={() => onIncreaseQuantity(item.product.id)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => onRemoveItem(item.product.id)}
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Разом:</span>
              <span>${totalPrice}</span>
            </div>

            <button
              className={styles.checkoutButton}
              onClick={() => {
                alert("Дякуємо! Ваше замовлення оформлено");
                onCheckout();
              }}
            >
              <CreditCard size={20} />
              Оформити замовлення
            </button>
          </div>
        )}
      </div>
    </>
  );
}
