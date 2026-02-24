import styles from "./Newsletter.module.css";

export function Newsletter() {
  return (
    <section className={styles.newsletterWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Funko's Newsletter</h2>
        <p className={styles.subtitle}>
          Join our mailing list and be the first to hear about new releases,
          upcoming events, and more!
        </p>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email Address*"
            required
            className={styles.input}
          />
          <button className={styles.submitBtn} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
