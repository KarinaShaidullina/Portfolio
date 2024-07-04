import React from 'react';
import { adminCreate } from '../../http/orderAPI';
import styles from './CreateOrder.module.css';

const defaultValue = { 
    first_name: '', 
    second_name: '', 
    delivery_type: 'courier', 
    city: '', 
    address: '', 
    comment: '',
    userId: '', 
    items: [{ name: '', current_price: '', quantity: '' }]
};

const defaultValid = { 
    first_name: null, 
    second_name: null, 
    city: null, 
    address: null, 
    userId: null,
    items: [{ name: null, current_price: null, quantity: null }]
};

const isValid = (value) => {
    const result = {};
    const pattern = /^[1-9][0-9]*$/;
    for (let key in value) {
        if (key === 'first_name') result.first_name = value.first_name.trim() !== '';
        if (key === 'second_name') result.second_name = value.second_name.trim() !== '';
        if (key === 'city')  result.city = value.city.trim() !== '';
        if (key === 'address') result.address = value.address.trim() !== '';
        if (key === 'delivery_type') result.delivery_type = ['courier', 'pickup'].includes(value.delivery_type);
        if (key === 'userId') result.userId = pattern.test(value.userId);
        if (key === 'items') {
            result.items = value.items.map(item => ({
                name: item.name.trim() !== '',
                current_price: /^[1-9][0-9]*$/.test(item.current_price.trim()),
                quantity: /^[1-9][0-9]*$/.test(item.quantity.trim())
            }));
        }
    }
    return result;
};

export const CreateOrder = (props) => {
    const { show, setShow, setChange } = props;
    const [value, setValue] = React.useState(defaultValue);
    const [valid, setValid] = React.useState(defaultValid);

    const handleInputChange = (event, index) => {
        const { name, value: inputValue } = event.target;
        const data = { ...value };
        if (name === 'name' || name === 'current_price' || name === 'quantity') {
            data.items[index][name] = inputValue;
        } else {
            data[name] = inputValue;
        }
        setValue(data);
        setValid(isValid(data));
    };
    

    const handleAddItem = () => {
        setValue({ ...value, items: [...value.items, { name: '', current_price: '', quantity: '' }] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const correct = isValid(value);
        setValid(correct);
    
        if (correct.first_name && correct.second_name && correct.delivery_type && correct.city && correct.address && correct.userId) {
            const data = {
                first_name: value.first_name.trim(),
                second_name: value.second_name.trim(),
                delivery_type: value.delivery_type.trim(),
                city: value.city.trim(),
                address: value.address.trim(),
                items: value.items,
                comment: value.comment && value.comment.trim() !== '' ? value.comment.trim() : null,
                userId: value.userId ? value.userId : null
            };
    
            adminCreate(data)
                .then(() => {
                    setValue(defaultValue);
                    setValid(defaultValid);
                    setShow(false);
                    setChange((state) => !state);
                })
                .catch((error) => alert(error.response.data.message));    
        }
    };

    return (
        <div style={{ display: show ? 'block' : 'none' }}>
            <div className={styles.modal}>
                <div>
                    <div>
                        <div className={styles.modal_header}>
                            <h4>Новый товар</h4>
                            <button type="button" className="button" onClick={() => setShow(false)}>х</button>
                        </div>
                        <div>
            <form className={styles.modal_body} onSubmit={handleSubmit}>
                <input
                    name="first_name"
                    value={value.first_name}
                    onChange={handleInputChange}
                    placeholder="Имя..."
                    className={`${valid.first_name === false ? 'is-invalid' : valid.first_name === true ? 'is-valid' : ''}`}
                />
                <input
                    name="second_name"
                    value={value.second_name}
                    onChange={handleInputChange}
                    placeholder="Фамилия..."
                    className={`${valid.second_name === false ? 'is-invalid' : valid.second_name === true ? 'is-valid' : ''}`}
                />
                <input
                    name="city"
                    value={value.city}
                    onChange={handleInputChange}
                    placeholder="Город доставки..."
                    className={`${valid.city === false ? 'is-invalid' : valid.city === true ? 'is-valid' : ''}`}
                />
                <input
                    name="address"
                    value={value.address}
                    onChange={handleInputChange}
                    placeholder="Адрес доставки..."
                    className={`${valid.address === false ? 'is-invalid' : valid.address === true ? 'is-valid' : ''}`}
                />
                <select
                    name="delivery_type"
                    value={value.delivery_type}
                    onChange={handleInputChange}
                >
                    <option value="courier">Курьер</option>
                    <option value="pickup">Самовывоз</option>
                </select>
                <input
                    name="comment"
                    value={value.comment}
                    onChange={handleInputChange}
                    placeholder="Комментарий к заказу..."
                />
                <input
                    name="userId"
                    value={value.userId}
                    onChange={handleInputChange}
                    placeholder="ID клиента..."
                    className={`${valid.userId === false ? 'is-invalid' : valid.userId === true ? 'is-valid' : ''}`}
                />
              
                    {value.items.map((item, index) => (
                        <div className={styles.items} key={index}>
                            <input
                                name="name"
                                value={item.name}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Наименование товара..."
                            />
                            <input
                                name="current_price"
                                value={item.current_price}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Цена товара..."
                            />
                            <input
                                name="quantity"
                                value={item.quantity}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="Количество..."
                            />
                        </div>
                    ))}
                
                <button type="button" onClick={handleAddItem}>Добавить товар</button>
                <button type="submit">Сохранить</button>
            </form>
            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




