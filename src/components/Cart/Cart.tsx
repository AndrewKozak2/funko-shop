import { type CartItem } from "../../types/product";
import styles from "./Cart.module.css";

interface CartProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({
  cartItems,
  onRemoveItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCheckout,
}: CartProps) {
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    .toFixed(2);
  return (
    <div className={styles.container}>
      <h2>Ваш кошик</h2>
      {cartItems.length === 0 && <p>Ваш кошик порожній</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.product.id} className={styles.cartItem}>
            <span>{item.product.title}</span>
            <span>{item.quantity} шт.</span>
            <button onClick={() => onIncreaseQuantity(item.product.id)}>
              +
            </button>
            <button onClick={() => onDecreaseQuantity(item.product.id)}>
              -
            </button>
            <span>{item.product.price}</span>
            <button onClick={() => onRemoveItem(item.product.id)}>x</button>
          </li>
        ))}
        <h3>{totalPrice}</h3>

        {cartItems.length > 0 && (
          <button
            className={styles.checkoutButton}
            onClick={() => {
              alert("замовлення успішне");
              onCheckout();
            }}
          >
            Оформити замовлення
          </button>
        )}
      </ul>
    </div>
  );
}
