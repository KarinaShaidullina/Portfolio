import { createCategory, fetchCategory, updateCategory } from '../../http/catalogAPI';
import React from 'react';
import styles from './EditCategory.module.css'

export const EditCategory = (props) => {
    const { id, show, setShow, setChange } = props;

    const [name, setName] = React.useState('');
    const [valid, setValid] = React.useState(null);

    React.useEffect(() => {
        if (id) {
            fetchCategory(id)
                .then(
                    data => {
                        setName(data.name);
                        setValid(data.name.trim() !== '');
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                );
        } else {
            setName('');
            setValid(null);
        }
    }, [id]);

    const handleChange = (event) => {
        setName(event.target.value);
        setValid(event.target.value.trim() !== '');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const correct = name.trim() !== '';
        setValid(correct);
        if (correct) {
            const data = {
                name: name.trim()
            };
            const success = (data) => {
                setShow(false);
                setChange(state => !state);
            };
            const error = (error) => alert(error.response.data.message);
            id ? updateCategory(id, data).then(success).catch(error) : createCategory(data).then(success).catch(error);
        }
    };

    return (
        show &&
        <div className={styles.modal}>
            <div className="modal-content">
                <div className={styles.modal_header}>
                    <h4>{id ? 'Редактирование' : 'Создание'} категории</h4>
                    <button className="button" onClick={() => setShow(false)}>×</button>   
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <input
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className={valid === true ? 'valid' : valid === false ? 'invalid' : ''}
                            placeholder="Название категории..."
                        />
                        <button className='admin_button' type="submit">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
