import { AppContext } from "../AppContext.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { registration } from "../http/userAPI";
import { observer } from 'mobx-react-lite';


const Register = observer(() => {
    const { user } = React.useContext(AppContext);
    const navigate = useNavigate();
    const loginRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const phone_numberRef = React.useRef(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    // если пользователь авторизован — ему здесь делать нечего
    React.useEffect(() => {
        if (user.isAdmin) navigate('/admin', {replace: true})
        if (user.isAuth) navigate('/user', {replace: true})
    },);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const login = loginRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        const email = emailRef.current.value.trim()
        const phone_number = phone_numberRef.current.value.trim()
        const data = await registration(login, password, email, phone_number)
        if (data) {
            user.login(data)
            if (user.isAdmin) navigate('/admin')
            if (user.isAuth) navigate('/user')
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    return (
        <section className="register">
            <div className="register_text">
                <h1>Зарегистрируйтесь, </h1>
                <h2>чтобы начать покупки</h2>
                <p>Если у вас есть учетная запись,<br/>вы можете <Link to="/login" className="link"><span>войти здесь!</span></Link></p>
            </div>
            <div className="register_inputs" onSubmit={handleSubmit}>
                <p>Зарегистрироваться</p>
                <input ref={emailRef} type="email" placeholder="Адрес электронной почты" />
                <input ref={loginRef} type="text" placeholder="Имя пользователя" />
                <input ref={phone_numberRef} type="tel" placeholder="Контактный номер"/>
                <div className="password">
                    <input ref={passwordRef} type={showPassword ? "text" : "password"} placeholder="Пароль" />
                    <img src="/img/EyeIkon.svg" alt="EyeIkon" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}/>
                </div>
                <div className="password">
                    <input ref={passwordRef} type={showConfirmPassword ? "text" : "password"} placeholder="Подтвердите пароль" />
                    <img src="/img/EyeIkon.svg" alt="EyeIkon" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}/>
                </div>
                <button type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
                <p>или продолжить с</p>
                <div className="login_social_networks">
                    <img src="/img/google.svg" alt="google" />
                    <img src="/img/facebook.svg" alt="facebook" />
                    <img src="/img/twitter.svg" alt="twitter" />
                </div>
            </div>
        </section>
    );
})

export {Register}