import styles from "./Hero.module.css";

export function Hero() {
  return (
    <div className="container">
      <section className={styles.heroWrapper}>
        <div className={styles.heroContent}>
          <h1>Ексклюзивні колекційні фігурки</h1>
          <button>Дивитись каталог</button>
        </div>
      </section>
    </div>
  );
}
