import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import toast from "react-hot-toast";

interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  totalPrice: number;
  createdAt: string;
}

export function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem("adminKey");
    if (savedKey) {
      fetchOrders(savedKey);
    }
  }, []);

  const fetchOrders = async (key: string) => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${apiUrl}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
      });

      if (response.status === 403) {
        toast.error("Wrong password!");
        localStorage.removeItem("adminKey");
        setIsAuthenticated(false);
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setOrders(data);
      setIsAuthenticated(true);
      localStorage.setItem("adminKey", key);
    } catch (error) {
      console.error(error);
      toast.error("Error loading orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(password);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminKey");
    setIsAuthenticated(false);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className={`container ${styles.wrapper}`}>
        <form onSubmit={handleLogin} className={styles.loginBox}>
          <h2>Admin Access</h2>
          <input
            type="password"
            placeholder="Enter Admin Key"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.header}>
        <div>
          <h1>Orders Dashboard</h1>
          <p style={{ color: "#94a3b8", marginTop: "5px" }}>
            Total orders: {orders.length}
          </p>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <strong>{order.customer.name}</strong>
                  <br />
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {order.customer.address}
                  </span>
                </td>
                <td>
                  {order.customer.phone}
                  <br />
                  {order.customer.email}
                </td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  <span className={styles.status}>New</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
