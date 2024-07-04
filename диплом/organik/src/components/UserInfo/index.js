import styles from './UserInfo.module.css';
import React from 'react';

const isValid = (input) => {
    switch (input.name) {
        case 'first_name':
          return input.value.trim() !== ''
        case 'email':
          return input.value.trim() !== ''
        case 'phone_number':
            return input.value.trim() !== ''
        default:
            return false; // или можно вернуть true, если необходимо
    }
  }

export const UserInfo = (props) => {
    const [value, setValue] = React.useState({first_name: props.data.login, email: props.data.email, phone_number: props.data.phone_number})
    const [valid, setValid] = React.useState({first_name: null, email: null, phone_number: null})

    const handleChange = (event) => {
        setValue({...value, [event.target.name]: event.target.value})
        setValid({...valid, [event.target.name]: isValid(event.target)})
    }

    return (
        <div className={styles.info}>
                <label htmlFor="first_name">Имя</label>
                <input type="text" name="first_name" id="first_name" value={value.first_name} 
                onChange={e => handleChange(e)} className={valid.first_name === true ? styles.valid : valid.first_name === false ? styles.invalid : ''}/>
                
                {/* <label htmlFor="second_name">Фамилия</label>
                <input type="text" name="second_name" id="second_name" placeholder="Иванов"/> */}

                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={value.email} 
                onChange={e => handleChange(e)} className={valid.email === true ? styles.valid : valid.email === false ? styles.invalid : ''}/>

                <label htmlFor="phone_number">Номер телефона</label>
                <input type="text" name="phone_number" id="phone_number" value={value.phone_number} 
                onChange={e => handleChange(e)} className={valid.phone_number === true ? styles.valid : valid.phone_number === false ? styles.invalid : ''}/>

                <button>Сохранить</button>
        </div>
    )
}
