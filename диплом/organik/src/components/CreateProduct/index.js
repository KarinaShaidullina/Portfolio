import React from 'react';
import { createProduct, fetchCategories} from '../../http/catalogAPI';
import styles from './CreateProduct.module.css'

const defaultValue = { name: '', old_price: '', current_price: '', category: '', description: '', product_description: '', additional_info: '' };
const defaultValid = { name: null, old_price: null, current_price: null, category: null, description: null, product_description: null, additional_info: null};

const isValid = (value) => {
    const result = {};
    const pattern = /^[1-9][0-9]*$/;
    for (let key in value) {
        if (key === 'name') result.name = value.name.trim() !== '';
        if (key === 'old_price') result.old_price = pattern.test(value.old_price.trim());
        if (key === 'current_price') result.current_price = pattern.test(value.current_price.trim());
        if (key === 'category') result.category = pattern.test(value.category);
        if (key === 'description') result.description = value.description.trim() !== '';
        if (key === 'product_description') result.product_description = value.product_description.trim() !== '';
        if (key === 'additional_info') result.additional_info = value.additional_info.trim() !== '';
    }
    return result;
};

export const CreateProduct = (props) => {
    const { show, setShow, setChange } = props;

    const [value, setValue] = React.useState(defaultValue);
    const [valid, setValid] = React.useState(defaultValid);
    // выбранное для загрузки изображение товара
    const [img, setImage] = React.useState(null)
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        fetchCategories().then((data) => setCategories(data));
    }, []);

    const handleInputChange = (event) => {
        const data = { ...value, [event.target.name]: event.target.value };
        setValue(data);
        setValid(isValid(data));
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const correct = isValid(value);
        setValid(correct);

        if (correct.name && correct.old_price && correct.current_price && correct.category && correct.description && correct.product_description && correct.additional_info) {
            const data = new FormData();
            data.append('name', value.name.trim());
            data.append('old_price', value.old_price.trim());
            data.append('current_price', value.current_price.trim());
            data.append('categoryId', value.category);
            data.append('description', value.description.trim());
            data.append('product_description', value.product_description.trim());
            data.append('additional_info', value.additional_info.trim());
            if (img) data.append('img', img, img.name)

            createProduct(data)
                .then(() => {
                    event.target.img.value = '';
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
                                    name="name"
                                    value={value.name}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Название товара..."
                                    className={`${valid.name === false ? 'is-invalid' : valid.name === true ? 'is-valid' : ''}`}
                                />
                                <select
                                    name="category"
                                    value={value.category}
                                    onChange={e => handleInputChange(e)}
                                    className={`${valid.category === false ? 'is-invalid' : valid.category === true ? 'is-valid' : ''}`}
                                >
                                    <option value="">Категория</option>
                                    {categories.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <input
                                    name="old_price"
                                    value={value.old_price}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Старая цена товара..."
                                    className={`${valid.old_price === false ? 'is-invalid' : valid.old_price === true ? 'is-valid' : ''}`}
                                />
                                <input
                                    name="current_price"
                                    value={value.current_price}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Текущая цена товара..."
                                    className={`${valid.current_price === false ? 'is-invalid' : valid.current_price === true ? 'is-valid' : ''}`}
                                />
                                <input
                                    name="description"
                                    value={value.description}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Краткое описание товара..."
                                    className={`${valid.description === false ? 'is-invalid' : valid.description === true ? 'is-valid' : ''}`}
                                />
                                <input
                                    name="product_description"
                                    value={value.product_description}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Описание товара..."
                                    className={`${valid.product_description === false ? 'is-invalid' : valid.product_description === true ? 'is-valid' : ''}`}
                                />
                                <input
                                    name="additional_info"
                                    value={value.additional_info}
                                    onChange={e => handleInputChange(e)}
                                    placeholder="Дополнительная информация..."
                                    className={`${valid.additional_info === false ? 'is-invalid' : valid.additional_info === true ? 'is-valid' : ''}`}
                                />
                                <label className={styles.custom_file_upload}>
                                    <input
                                    name="img"
                                    type="file"
                                    onChange={e => handleImageChange(e)}/>Фото товара...
                                </label>
                                
                                <button type="submit">Сохранить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
