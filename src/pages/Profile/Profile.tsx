import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { LogOut } from "lucide-react";
import styles from "./Profile.module.css";

export function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileBox}>
        <h2 className={styles.title}>Мій Профіль</h2>

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
          <span>Вийти з акаунту</span>
        </button>

        {/* Тут треба буде додати історію замовлень аби не забув */}
      </div>
    </div>
  );
}
