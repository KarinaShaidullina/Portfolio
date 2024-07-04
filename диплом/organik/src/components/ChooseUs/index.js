import styles from './ChooseUs.module.css';

export function ChooseUs() {
    return (
        <section className={styles.choose_us}>
        <div className={styles.choose_us_content}>
          <p className="green_title">Почему выбирают нас?</p>
          <h2>Мы не покупаем на открытом рынке и у торговцев</h2>
          <div className={styles.choose_us_reason}>
            <div className={styles.choose_us_reason_text_round}></div>
            <p className={styles.choose_us_reason_text}>100% натуральные продукты</p>
          </div>
          <p className={styles.choose_us_reason_description}>Выращенные без использования пестицидов и химических удобрений</p>
          <div className={styles.choose_us_reason}>
            <div className={styles.choose_us_reason_text_round}></div>
            <p className={styles.choose_us_reason_text}>Повышаем устойчивость</p>
          </div>
          <p className={styles.choose_us_reason_description}>Повышение устойчивости культур к вредителям и болезням</p>
        </div>
        <img src="/img/WhyChooseUs.png" alt="WhyChooseUs"/>
      </section>
    );
  }
  