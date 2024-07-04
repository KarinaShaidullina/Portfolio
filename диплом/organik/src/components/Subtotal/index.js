import styles from './Subtotal.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { AppContext } from "../../AppContext";

export const Subtotal = observer(() => {
  const { basket } = React.useContext(AppContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (basket.freeDelivery) {
        basket.setDeliveryCost(0);
    } else {
        basket.setDeliveryCost(10);
    }
    // eslint-disable-next-line
}, []);

    return (
        <section className={styles.subtotal}>
        <div className={styles.subtotal_price}>
          <div className={styles.subtotal_text}>
            <p>Итого:</p>
            <p>{basket.sum}.00</p>
            <p>₽</p>
          </div>
          <div className={styles.delivery}>
            <p>Доставка:</p>
            <p>{basket.deliveryCost}.00</p>
            <p>₽</p>
          </div>
        </div> 
        <button className={styles.checkout_button} onClick={() => navigate('/checkout')}>Оформить заказ<span className="btn_arrow">&#129122;</span></button>
      </section>
    );
})
  