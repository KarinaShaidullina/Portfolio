import styles from './WeOffer.module.css';

export function WeOffer() {
    return (
        <section className={styles.we_offer}>
        <p className="green_title">О Нас</p>
        <h2>Что мы предлагаем Вам</h2>
        <div className={styles.we_offer_cards}>
          <figure>
            <img src="/img/Spicy.png" alt="Spicy"/>
            <figcaption>Специи</figcaption>
          </figure>
          <figure>
            <img src="/img/Nuts&Feesd.png" alt="Nuts & Feesd"/>
            <figcaption>Орехи и семена</figcaption>
          </figure>
          <figure>
            <img src="/img/Fruits.png" alt="Fruits"/>
            <figcaption>Фрукты</figcaption>
          </figure>
          <figure>
            <img src="/img/Vegetable.png" alt="Vegetable"/>
            <figcaption>Овощи</figcaption>
          </figure>
        </div>
      </section>
    );
  }