import styles from './Creative.module.css';
import { useNavigate } from 'react-router-dom';

export function Creative() {
  const navigate = useNavigate();
  
  const handleClick = () => {
       navigate(`/blog`)
  };
    return (
        <section className={styles.creative}>
        <div className={styles.creative_content}>
          <p className="green_title">О Нас</p>
          <h2>Мы творчески <br/> достигаем успеха</h2>
          <p>Наша компания отличается творческим подходом к решению задач, что позволяет нам достигать выдающихся результатов. 
            Мы постоянно ищем новые идеи и инновационные решения, чтобы быть на шаг впереди конкурентов.</p>
          <p>Наш коллектив объединен стремлением к качественной и креативной работе, что делает нашу команду непревзойденной в своей области. 
            Мы уверены, что именно наш творческий подход является ключом к нашему успеху.</p>
          <div className={styles.creative_content_cards}>
            <div className={styles.creative_content_card}>
              <img src="/img/AboutIcon_1.svg" alt="AboutIcon1"/>
              <h3>Современное сельскохозяйственное оборудование</h3>
            </div>
            <div className={styles.creative_content_card}>
              <img src="/img/AboutIcon_2.svg" alt="AboutIcon2"/>
              <h3>Не используем гормоны роста</h3>
            </div>
          </div>
          <button onClick={handleClick} className={styles.creative_button}>Узнайте Больше<span className="btn_arrow">&#129122;</span></button>
        </div>
      </section>
    );
  }
  