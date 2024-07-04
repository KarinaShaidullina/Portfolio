import { NewsCard } from '../NewsCard';
import styles from './Articles.module.css';

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
  },
  {
    id: 3,
    img: '/img/News_3.png',
    news_card_round:'5 Дек',
    name: 'Александр Иванов',
    title: 'Преимущества Витамина C и Как Его Получить',
    text: 'Мощный антиоксидант, укрепляющий иммунитет и поддерживающий здоровье кожи.'
  },
  {
    id: 4,
    img: '/img/News_4.png',
    news_card_round:'7 Мая',
    name: 'Артём Крылов',
    title: 'Исследуйте больше органических продуктов',
    text: 'Узнайте больше об органических продуктах и их полезных свойствах для вашего здоровья.' 
  },
  {
    id: 5,
    img: '/img/News_5.png',
    news_card_round:'14 Авг',
    name: 'Мария Щербакова',
    title: 'Ежедневные свежие фрукты',
    text: 'Добавьте ежедневные свежие фрукты для здоровья и энергии.'
  },
  {
    id: 6,
    img: '/img/News_6.png',
    news_card_round:'13 Сент',
    name: 'Екатерина Смирнова',
    title: 'Как использование пластика убивает природу',
    text: 'Использование пластика угрожает природе, вызывая загрязнение и ущерб экосистемам.' 
  }
]

export function Articles({onArticleClick}) {
    return (
        <section className={styles.articles}>
    <div className={styles.articles_cards}>
    {arr.map((obj) => (
                    <NewsCard
                        key={obj.id}
                        img={obj.img}
                        news_card_round={obj.news_card_round}
                        name={obj.name}
                        title={obj.title}
                        text={obj.text}
                        onArticleClick={onArticleClick}
                        id={obj.id}
                        />))}
    </div>
  </section>);
}