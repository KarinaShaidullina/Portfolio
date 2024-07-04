import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
    <footer className={styles.footer}>
    <nav className={styles.footer__nav}>
      <div className={styles.footer__nav_item_1}>
        <h4>Связаться с нами</h4>
        <p className={styles.footer__nav_item_subtitle}>Электронная почта</p>
        <p>needhelp@Organia.com</p>
        <p className={styles.footer__nav_item_subtitle}>Телефон</p>
        <p>+7 984 475 64 12</p>
        <p className={styles.footer__nav_item_subtitle}>Адрес</p>
        <p>ул.Ленина, д.10, кв.5, г.Казань, <br /> Республика Татарстан,Россия, 420111</p>
      </div>
      <div className={styles.footer__nav_item_2}>
        <img src="/img/Logo.svg" alt="Logo" />
        <p>Ваш надежный выбор для здорового образа жизни <br /> и уважения к окружающей среде</p>
        <img src="/img/instagram.svg" alt="instagram" />
        <img src="/img/facebook.svg" alt="facebook" />
        <img src="/img/twitter.svg" alt="twitter" />
        <img src="/img/pinterest.svg" alt="pinterest" />
      </div>
      <div className={styles.footer__nav_item_3}>
        <h4>Страницы</h4>
        <Link to="/" className={styles.footer__nav_item_text}>Главная</Link>
        <Link to="/about" className={styles.footer__nav_item_text}>О Нас</Link>
        <Link to="/shop" className={styles.footer__nav_item_text}>Блог</Link>
        <Link to="/blog" className={styles.footer__nav_item_text}>Каталог</Link>
        <Link to="/team" className={styles.footer__nav_item_text}>Команда</Link>
      </div>
    </nav>
  </footer>);
}