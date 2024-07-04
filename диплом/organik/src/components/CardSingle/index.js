import styles from './CardSingle.module.css';
import React from 'react';
import { fetchOneProduct, rateProduct } from '../../http/catalogAPI.js';
import { useParams } from 'react-router-dom';
import { append } from '../../http/basketAPI.js';
import { AppContext } from '../../AppContext.js';

export function CardSingle({data}) {
    const { id } = useParams();
    const { basket } = React.useContext(AppContext);
    const [product, setProduct] = React.useState(null);
    const [rating, setRating] = React.useState(0); // Начальное состояние рейтинга

    React.useEffect(() => {
      fetchOneProduct(id).then(data => {
        setProduct(data);
        setRating(data.rating || 0); // Устанавливаем рейтинг после загрузки продукта
      });
    }, [id]);

  const handleClick = (productId) => {
      append(productId).then(data => {
          basket.products = data.products
      })
  }

  const handleRatingClick = async (event, newRating) => {
    event.stopPropagation(); // Предотвращаем событие клика для карточки
    try {
      const response = await rateProduct(id, newRating); // Отправка запроса на сервер
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

  if (!product) {
      return <p>Loading</p>
  }

    return (
        <section className={styles.card_single}>
        <div className={styles.card_single_img}>
          <p className={styles.card_description}>{product.category.name}</p>
          <img src={process.env.REACT_APP_IMG_URL + product.img} alt="WhiteNuts"/>
        </div>
        <div className={styles.card_single_content}>
          <h3>{product.name}</h3>
          <div className="rating">
          {renderStars()}
        </div>
        <div className={styles.card_single_price}>
          <p className={styles.old_price}>{product.old_price} ₽</p>
          <p className={styles.price__currency}>{product.current_price}</p>
          <p className={styles.currency}>₽</p>
        </div>
        <p>{product.description}</p>
        <div className={styles.card_single_add}>
        <button className={styles.card_single_button} onClick={() => handleClick(product.id)}>Добавить в корзину<span className="btn_arrow">&#129122;</span></button> 
        </div>
        </div>
    </section>
    );
  }

  