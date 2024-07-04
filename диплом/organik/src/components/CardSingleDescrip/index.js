import styles from './CardSingleDescrip.module.css';
import React from 'react';
import { fetchOneProduct } from '../../http/catalogAPI.js';
import { useParams } from 'react-router-dom';

export function CardSingleDescrip() {
  const [showDescription, setShowDescription] = React.useState(true);
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [isActive, setIsActive] = React.useState(false);
 
  React.useEffect(() => {
    fetchOneProduct(id).then(data => setProduct(data))
  }, [id])

  const toggleInfo = () => {
      setShowDescription(!showDescription);
      setIsActive(!isActive);
  };

    return (
        <section className={styles.card_single_description}>
        <div className={styles.card_single_description_buttons}>
          <button className={isActive ? styles.active : styles.button} onClick={toggleInfo}>Описание продукта</button>
          <button className={isActive ? styles.button : styles.active} onClick={toggleInfo}>Дополнительная информация</button>
        </div>
        {showDescription ? <p>{product && product.product_description}</p> : <p>{product && product.additional_info}</p>}
      </section>
    );
}
