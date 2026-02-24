import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroPanel}>
          <div className={styles.textSide}>
            <span className={styles.badge}>LIMITED EDITION</span>
            <h1>IRON MAN POP</h1>
            <button className={styles.preOrderBtn}>Pre-Order Now</button>
          </div>
          <div className={styles.imageSide}>
            <img src="/assets/iron.png" alt="Iron Man" />
          </div>
        </div>
      </div>
    </section>
  );
}
