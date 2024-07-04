import { Link } from 'react-router-dom';
import styles from './Orders.module.css';

export const Orders = (props) => {

    if (props.items.length === 0) {
        return <p>Список заказов пустой</p>
    }

    return (
        <table>
            <thead>
                <tr className={styles.thead}>
                    <th className={styles.column}>№</th>
                    <th className={styles.column}>Покупатель</th>
                    <th className={styles.column}>Статус</th>
                    <th className={styles.column}>Сумма</th>
                    <th className={styles.column}>Подробнее</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => 
                    <tr key={item.id}>
                        <td className={styles.column}>{item.id}</td>
                        <td className={styles.column}>{item.first_name + item.second_name}</td>
                        <td className={styles.column}>{item.status}</td>
                        <td className={styles.column}>{item.total_price}</td>
                        <td className={styles.column}>
                            {props.admin ? (
                                <Link className={styles.link} to={`/admin/order/${item.id}`}>Подробнее</Link>
                            ) : (
                                <Link className={styles.link} to={`/user/order/${item.id}`}>Подробнее</Link>
                            )}
                            
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
