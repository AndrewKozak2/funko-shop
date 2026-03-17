import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { LogOut } from "lucide-react";
import styles from "./Profile.module.css";

interface Order {
  _id: string;
  status: string;
  totalPrice: number;
}

export function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchMyOrders = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/orders/user/${user.email}`);

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchMyOrders();
  }, [user]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileBox}>
        <h2 className={styles.title}>Profile</h2>

        <div className={styles.card}>
          <div className={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user.name}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          <LogOut size={18} />
          <span>LogOut</span>
        </button>
      </div>

      <div className={styles.ordersSection}>
        <h3 className={styles.ordersTitle}>Order history</h3>

        {loadingOrders ? (
          <p className={styles.loadingText}>Loading your purchases...</p>
        ) : orders.length === 0 ? (
          <p className={styles.emptyText}>
            You don't have any orders yet. It's time to choose your first Funko
            figure!
          </p>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderId}>
                    Order #{order._id.slice(-6)}
                  </span>
                  <span className={styles.orderStatus}>{order.status}</span>
                </div>
                <div className={styles.orderFooter}>
                  <span className={styles.orderTotal}>
                    Sum: ${order.totalPrice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
