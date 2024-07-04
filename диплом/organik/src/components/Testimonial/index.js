import styles from './Testimonial.module.css';
import React from "react";
import { TestimonialCard } from '../TestimonialCard';


const arr = [
  {
    id: 1,
    img: '/img/Customer.png',
    text: 'Я впечатлена качеством органических продуктов в вашем магазине. Все было свежим и вкусным. Обязательно буду покупать у вас снова!',
    name: 'Мария Иванова',
    role: 'Покупатель'
  },
  {
    id: 2,
    img: '/img/Customer2.png',
    text: 'Отличный сервис и быстрая доставка. Спасибо!',
    name: 'Иван Петров',
    role: 'Покупатель'
  },
  {
    id: 3,
    img: '/img/Customer3.png',
    text: 'Большой выбор органических продуктов. Очень доволен покупкой.',
    name: 'Сергей Смирнов',
    role: 'Покупатель'
  }
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleNavigationClick = (index) => {
    setActiveIndex(index);
  };

    return (
    <section className={styles.testimonial}>
    <p className="green_title">Отзывы</p>
    <h2>Что говорит наш Клиент?</h2>
    <div>
        <TestimonialCard
          key={arr[activeIndex].id} 
          id={arr[activeIndex].id} 
          img={arr[activeIndex].img}
          text={arr[activeIndex].text} 
          name={arr[activeIndex].name}
          role={arr[activeIndex].role}
        />
      </div>
      <div className={styles.navigation_container}>
        {arr.map((_, index) => (
          <div
            key={index}
            className={`${styles.navigation} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => handleNavigationClick(index)}
          ></div>
        ))}
      </div>
    <div className={styles.testimonial_rounds}>
      <div className={styles.testimonial_round}>
        <h2>100%</h2>
        <p>Экологично</p>
      </div>
      <div className={styles.testimonial_round}>
        <h2>285</h2>
        <p>Действующих продуктов</p>
      </div>
      <div className={styles.testimonial_round}>
        <h2>350+</h2>
        <p>Органических Садов</p>
      </div>
      <div className={styles.testimonial_round}>
        <h2>25+</h2>
        <p>Лет фермерства</p>
      </div>
    </div>
  </section>);
}