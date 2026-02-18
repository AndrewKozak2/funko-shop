import { type CartItem } from "../../types/product";
import styles from "./Cart.module.css";

interface CartProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
}

export function Cart({ cartItems, onRemoveItem }: CartProps) {
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
            <span>{item.product.price}</span>
            <button onClick={() => onRemoveItem(item.product.id)}>x</button>
          </li>
        ))}
        <h3>{totalPrice}</h3>
      </ul>
    </div>
  );
}
