import styles from './Order.module.css';

export const Order = (props) => {
    return (
        <>
            <ul className={styles.list}>
                <li>
                    <b>Статус заказа:</b> 
                    {props.data.status === 0 && <span> Новый</span>}
                    {props.data.status === 1 && <span> В работе</span>}
                    {props.data.status === 2 && <span> Завершен</span>}
                </li>
                <li><b>Имя:</b> {props.data.first_name}</li>
                <li><b>Фамилия:</b> {props.data.second_name}</li>
                <li><b>Адрес доставки:</b> {props.data.city + " " + props.data.address}</li>
                <li><b>Комментарий:</b> {props.data.comment}</li>
            </ul>
            <p className={styles.p}><b>Продукты:</b></p>
            <table>
                <thead>
                    <tr>
                        <th className={styles.column}>Название</th>
                        <th className={styles.column}>Цена</th>
                        <th className={styles.column}>Кол-во</th>
                        <th className={styles.column}>Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.items.map(item => 
                        <tr key={item.id}>
                            <td className={styles.column}>{item.name}</td>
                            <td className={styles.column}>{item.price}</td>
                            <td className={styles.column}>{item.quantity}</td>
                            <td className={styles.column}>{item.price * item.quantity}</td>
                        </tr>
                    )}
                    <tr>
                        <td className={styles.column} colSpan={3}><i>Итого:</i></td>
                        <td className={styles.column}><i>{props.data.total_price}</i></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
