import styles from './Eco.module.css';

export function Eco() {
    return (
    <section className={styles.eco}>
    <img src="/img/Field.png" alt="Field" />
    <div className={styles.eco_content}>
      <p className="green_title">Экологически Чистый</p>
      <h2>Дружелюбный Магазин Органических Продуктов</h2>
      <div className={styles.eco_content_text}>
        <h3>Начните с нашей компании</h3>
        <p>
          Мы уверены, что сотрудничество с нашей компанией станет надежным и
          успешным началом вашего пути к достижению целей.
        </p>
      </div>
      <div className={styles.eco_content_text}>
        <h3>Узнайте, как расти самостоятельно</h3>
        <p>
          Откройте для себя методы самостоятельного развития в сфере
          органического фермерства, чтобы достичь новых успехов.
        </p>
      </div>
      <div className={styles.eco_content_text}>
        <h3>Современные стратегии сельского хозяйства</h3>
        <p>
          Узнайте о современных стратегиях сельского хозяйства, которые
          помогут вам выбирать и покупать лучшие органические продукты.
        </p>
      </div>
    </div>
  </section>);
}