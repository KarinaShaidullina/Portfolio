import styles from './AboutUs.module.css';
import { useNavigate } from "react-router-dom";

export function AboutUs() {
  const navigate = useNavigate();
  
  const handleClick = () => {
       navigate(`/shop`)
  };
    return (
    <section className={styles.about_us}>
    <p className={styles.green_title}>О Нас</p>
    <h2>Мы верим в работу лицензированных фермеров</h2>
    <p>С их помощью мы можем обеспечить клиентов качественными продуктами.
      Такая партнерская поддержка фермеров позволяет нам сохранять
      стабильность и качество нашей продукции.</p>
    <div className={styles.about_us_card}>
      <img src="/img/MainIcon_1.svg" alt="MainIcon1" />
      <div className={styles.about_us_card_text}>
        <h3>Только Органические Продукты</h3>
        <p>Наслаждайтесь натуральным вкусом и полезными свойствами наших товаров.</p>
      </div>
    </div>
    <div className={styles.about_us_card}>
      <img src="/img/MainIcon_2.svg" alt="MainIcon2" />
      <div className={styles.about_us_card_text}>
        <h3>Стандарты Качества</h3>
        <p>Стандарты качества играют важную роль в производстве и предоставлении товаров и услуг.</p>
      </div>
    </div>
    <button onClick={handleClick} className={styles.about_us_button}>Купить<span className="btn_arrow">&#129122;</span></button>
  </section>);
}