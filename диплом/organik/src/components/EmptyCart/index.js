import styles from './EmptyCart.module.css';
import { Link } from 'react-router-dom';

export function EmptyCart() {
    return (
        <section className={styles.empty_cart}>
        <h2>Ваша корзина пуста и печальна :(</h2>
        <p>Добавьте что-нибудь, чтобы сделать ее счастливой!</p>
        <Link to="/shop" className='link'><button className={styles.empty_cart_button}>Продолжить покупки<span className="btn_arrow">&#129122;</span></button></Link>
      </section>
    );
}
  