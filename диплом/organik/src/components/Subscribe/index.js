import styles from './Subscribe.module.css';

export function Subscribe() {
    return (
    <section className={styles.subscribe}>
    <img className={styles.subscribe_background} src="/img/Subscribe.png" alt="Subscribe"/>
    <div className={styles.subscribe_content}>
      <h2>Подпишитесь на <br /> нашу рассылку</h2>
      <div className={styles.subscribe_action}>
        <input type="text" placeholder="Ваш электронный адрес" />
        <button className={styles.subscribe_button}>Подписаться</button>
      </div>
    </div>
    </section>);
}