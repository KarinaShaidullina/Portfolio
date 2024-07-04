import styles from './ChooseUsCards.module.css';

export function ChooseUsCards() {
    return (
      <section className={styles.choose_us_cards}>
        <div className={styles.choose_us_card}>
          <img src="/img/ReturnPolicy.svg" alt="ReturnPolicy"/>
          <h3>Политика возврата</h3>
          <p>Простая и надежная политика возврата для вашего удобства</p>
        </div>
        <div className={styles.choose_us_card}>
          <img src="/img/100_Fresh.svg" alt="100Fresh"/>
          <h3>100% Свежее</h3>
          <p>Наслаждайтесь 100% свежестью каждого нашего продукта</p>
        </div>
        <div className={styles.choose_us_card}>
          <img src="/img/Support_24_7.svg" alt="Support_24_7"/>
          <h3>Поддержка 24/7</h3>
          <p>Мы готовы помочь вам 24/7 - ваша поддержка всегда на связи</p>
        </div>
        <div className={styles.choose_us_card}>
          <img src="/img/SecuredPayment.svg" alt="SecuredPayment"/>
          <h3>Безопасный платеж</h3>
          <p>Безопасность вашего платежа - наш приоритет</p>
        </div>
      </section>
    );
  }