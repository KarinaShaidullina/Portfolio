import styles from "./CartCard.module.css";

export function CartCard(props) {
  return (
    <div className={styles.cart_main_items}>
      <img className={styles.cart_main_img} src={process.env.REACT_APP_IMG_URL + props.img} alt=""/>
      <div className={styles.cart_item}>
        <div className={styles.wrapper}>
          <p className={styles.card_title}>{props.name}</p>
          <div className={styles.items}>
            <div className={styles.items__control} onClick={() => props.decrement(props.id)}>-</div>
            <div className={styles.items__current}>{props.quantity}</div>
            <div className={styles.items__control} onClick={() => props.increment(props.id)}>+</div>
          </div>
        </div>
        <div className={styles.product_price}>
          <p className={styles.price__currency}>{props.current_price}</p>
          <p className={styles.currency}>₽</p>
        </div>
        <button className={styles.remove_button} onClick={() => props.remove(props.id)}>Удалить</button>
      </div>
    </div>
  );
}
