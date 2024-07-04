import styles from './HomePage.module.css';
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog`)
  };
    return (
    <section className={styles.home_page}>
    <p className="green_title">100% Натуральная Еда</p>
    <h1>Выбирайте здоровый образ жизни</h1>
    <button onClick={handleClick} className={styles.home_page_button}>
      Изучите сейчас<span className={styles.btn_arrow}>&#129122;</span>
    </button>
  </section>);
}