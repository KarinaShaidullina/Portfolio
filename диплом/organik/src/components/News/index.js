import styles from './News.module.css';
import { NewsCard } from '../NewsCard';
import { useNavigate } from 'react-router-dom';

const arr = [
  {
    id: 1,
    img: '/img/News_1.png',
    news_card_round:'25 Нояб',
    name: 'Александр Иванов',
    title: 'Преимущества Витамина D и Как Его Получить',
    text: 'Витамин D и его роль для здоровья костей и иммунной системы.'
  },
  {
    id: 2,
    img: '/img/News_2.png',
    news_card_round:'12 Февр',
    name: 'Екатерина Смирнова',
    title: 'Наш Любимый Летний Помидор',
    text: 'Помидор - незаменимый овощ в летнем сезоне, богатый витаминами и освежающий своим вкусом.' 
  }
]

export function News({onArticleClick}) {
  const navigate = useNavigate();
  
  const handleClick = () => {
       navigate(`/blog`)
  };
    return (
    <section className={styles.news}>
    <p className="green_title">Новости</p>
    <div className={styles.news_title}>
      <h2>Еженедельная информация о продуктах питания и многом другом</h2>
      <button onClick={handleClick} className={styles.news_button}>Еще новости<span className="btn_arrow">&#129122;</span></button>
    </div>
    <div className={styles.news_cards}>
    {arr.map((obj) => (
        <NewsCard key={obj.id} img={obj.img} news_card_round={obj.news_card_round} name={obj.name} title={obj.title} text={obj.text} onArticleClick={onArticleClick}
        id={obj.id}/>
      ))}
    </div>
  </section>);
}