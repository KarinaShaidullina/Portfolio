import styles from './FruitsVegetables.module.css';

export function FruitsVegetables() {
    return (
    <section className={styles.fruits_vegetables}>
    <div className={styles.fruits_vegetables_card_1}>
      <p className={styles.green_title}>Натурально!!</p>
      <h3>Садовые свежие <br /> фрукты</h3>
    </div>
    <div className={styles.fruits_vegetables_card_2}>
      <p className={styles.green_title}>Предложения!!</p>
      <h3>Cкидка 10% <br /> на овощи</h3>
    </div>
  </section>);
}