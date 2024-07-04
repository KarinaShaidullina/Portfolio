import styles from "./Card.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext.js";
import { rateProduct } from "../../http/catalogAPI.js";

export function Card({ data }) {
  const navigate = useNavigate();
  const { catalog } = React.useContext(AppContext);
  const [rating, setRating] = React.useState(data.rating || 0); // Начальное состояние рейтинга

  const handleRatingClick = async (event, newRating) => {
    event.stopPropagation(); // Предотвращаем событие клика для карточки
    try {
      const response = await rateProduct(data.id, newRating); // Отправка запроса на сервер
      setRating(response.rate);
    } catch (error) {
      console.error("Ошибка при установке рейтинга:", error);
    }
  };

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const partialStarWidth = (rating - fullStars) * 100;

    return [5, 4, 3, 2, 1].map((star) => {
      const isActive = star <= fullStars;
      const isPartial = star === fullStars + 1;
      return (
        <div
          key={star}
          className={`rating_item ${isActive ? 'active' : ''} ${isPartial ? 'partial' : ''}`}
          style={isPartial ? { '--partial-width': `${partialStarWidth}%` } : {}}
          onClick={(event) => handleRatingClick(event, star)}
        >
          ★
        </div>
      );
    });
  };

  return (
    <div className={styles.card} onClick={() => navigate(`/product/${data.id}`)}>
      <p className={styles.card_description}>{catalog.categories[data.categoryId]}</p>
      <img className={styles.product_img} src={process.env.REACT_APP_IMG_URL + data.img} alt="product"/>
      <p className={styles.card_title}>{data.name}</p>
      <div className={styles.card_price}>
        <p className={styles.old_price}>{data.old_price}.00 ₽</p>
        <p className={styles.price__currency}>{data.current_price}.00</p>
        <p className={styles.currency}>₽</p>
        <div className="rating">
          {renderStars()}
        </div>
      </div>
    </div>
  );
}
