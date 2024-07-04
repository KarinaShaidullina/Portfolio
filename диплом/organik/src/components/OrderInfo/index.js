import styles from './OrderInfo.module.css';
import React from 'react';
import { AppContext } from '../../AppContext.js';
import { userCreate, guestCreate } from '../../http/orderAPI';
import { fetchBasket } from '../../http/basketAPI';
import { check as checkAuth } from '../../http/userAPI';
import { Loader } from '../Loader/index.js';

const isValid = (input) => {
  switch (input.name) {
      case 'first_name':
        return input.value.trim() !== ''
      case 'second_name':
        return input.value.trim() !== ''
      case 'city':
        return input.value.trim() !== ''
      case 'address':
        return input.value.trim() !== ''
      default:
        return false; // или можно вернуть true, если необходимо
  }
}

export function OrderInfo() {
    const { user, basket } = React.useContext(AppContext);
    const [fetching, setFetching] = React.useState(true); // loader, пока получаем корзину

    const [order, setOrder] = React.useState(null);
    const [deliveryMethod, setDeliveryMethod] = React.useState('courier');
    const [agreementChecked, setAgreementChecked] = React.useState(false);

    const handleDeliveryChange = (event) => {
      setDeliveryMethod(event.target.value);
    };

    const handleAgreementChange = (event) => {
      setAgreementChecked(event.target.checked);
    };

    const [value, setValue] = React.useState({ first_name: '', second_name: '', city: '', address: '' });
    const [valid, setValid] = React.useState({ first_name: null, second_name: null, city: null, address: null });

    React.useEffect(() => {
        // если корзина пуста, здесь делать нечего
        fetchBasket()
            .then(data => basket.products = data.products)
            .finally(() => setFetching(false));

        // нужно знать, авторизован ли пользователь
        checkAuth()
            .then(data => {
                if (data) {
                    user.login(data);
                }
            })
            .catch(error => user.logout());

        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        if (valid.first_name && valid.second_name && valid.city && valid.address) {
            const comment = value.comment ? value.comment : null;
            const body = { ...value, comment, delivery_type: deliveryMethod };
            const create = user.isAuth ? userCreate : guestCreate;

            create(body)
                .then(data => {
                    setOrder(data);
                    basket.products = [];
                })
                .catch(error => {
                    console.error('Ошибка при создании заказа:', error);
                    console.error('Содержимое ошибки:', error.response.data);
                });
        }
    }, [valid, value, deliveryMethod, user.isAuth, basket.products]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Проверяем, что чекбокс был отмечен
        if (!agreementChecked) {
            alert('Вы должны согласиться с условиями соглашения');
            return;
        }

        const formData = {
            first_name: event.target.first_name.value.trim(),
            second_name: event.target.second_name.value.trim(),
            city: event.target.city.value.trim(),
            address: event.target.address.value.trim(),
        };

        setValue(formData);

        setValid({
            first_name: isValid({ name: 'first_name', value: formData.first_name }),
            second_name: isValid({ name: 'second_name', value: formData.second_name }),
            city: isValid({ name: 'city', value: formData.city }),
            address: isValid({ name: 'address', value: formData.address }),
        });
    };

    const handleChange = (event) => {
        setValue({ ...value, [event.target.name]: event.target.value });
    };

    const getStyle = (isValid) => {
        return isValid === true
            ? { border: '1px solid #7EB693' }
            : isValid === false
                ? { border: '1px solid red' }
                : {};
    };

    return (
        <div>
            {fetching ? (
                <Loader />
            ) : order ? (
                <div className={styles.issued}>
                    <h2>Заказ оформлен</h2>
                    <p>Наш менеджер скоро позвонит для уточнения деталей.</p>
                </div>
            ) : (
                <form className={styles.order_info} onSubmit={handleSubmit}>
                    <div>
                        <div className={styles.order_info_customer}>
                            <h2>Покупатель</h2>
                            <label htmlFor="first_name">Имя</label>
                            <input type="text" name="first_name" id="first_name" placeholder="Иван" value={value.first_name}
                                onChange={handleChange} style={getStyle(valid.first_name)} />

                            <label htmlFor="second_name">Фамилия</label>
                            <input type="text" name="second_name" id="second_name" placeholder="Иванов" value={value.second_name}
                                onChange={handleChange} style={getStyle(valid.second_name)} />
                        </div>

                        <div className={styles.order_info_address}>
                            <h2>Адрес доставки</h2>

                            <label>Город</label>
                            <input type="text" name="city" placeholder="г. Казань" value={value.city}
                                onChange={handleChange} style={getStyle(valid.city)} />

                            <label>Адрес</label>
                            <input type="text" name="address" placeholder="ул.Домодедовская 97 кв.34" value={value.address}
                                onChange={handleChange} style={getStyle(valid.address)} />
                        </div>
                    </div>

                    <div>
                        <div className={styles.order_info_delivery}>
                            <h2>Способ доставки</h2>

                            <label htmlFor="courier"><input type="radio" name="deliveryMethod" id="courier" value="courier"
                                checked={deliveryMethod === 'courier'} onChange={handleDeliveryChange} />Доставка курьером</label>

                            <label htmlFor="pickup"><input type="radio" name="deliveryMethod" id="pickup" value="pickup"
                                checked={deliveryMethod === 'pickup'} onChange={handleDeliveryChange} />Самовывоз</label>
                        </div>

                        <div className={styles.order_info_payment}>
                            <h2>Способ оплаты</h2>
                            <p>Оплата при получении наличными или картой</p>
                        </div>

                        <div className={styles.order_info_comment}>
                            <label htmlFor="comment">Комментарий к заказу</label>
                            <input type="text" name="comment" id="comment" />
                        </div>
                    </div>

                    <div className={styles.order_info_checkout}>
                        <div className={styles.checkout_subtotal}>
                            <h2>Сумма заказа:</h2>
                            <p>{basket.sum}</p>
                            <p>₽</p>
                        </div>
                        <label><input type="checkbox" name="agreement" checked={agreementChecked} onChange={handleAgreementChange} />Я прочитал и согласен с Условиями соглашения</label>
                        <button type='submit'>Оформить заказ</button>
                    </div>
                </form>
            )}
        </div>
    );
}
