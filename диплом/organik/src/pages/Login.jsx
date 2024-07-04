import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { login } from "../http/userAPI";
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";


export const Login = observer(() => {
    const { user } = React.useContext(AppContext);
    const navigate = useNavigate();
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const [showPassword, setShowPassword] = React.useState(false);

    // если пользователь авторизован — ему здесь делать нечего
    React.useEffect(() => {
        if (user.isAdmin) {
            navigate(`/admin/${user.id}`, { replace: true });
        } else if (user.isAuth) {
            navigate(`/user/${user.id}`, { replace: true });
        }
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = emailRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        const data = await login(email, password)
        if (data) {
            user.login(data);
            if (user.isAdmin) {
                navigate(`/admin/${user.id}`);
            } else if (user.isAuth) {
                navigate(`/user/${user.id}`);
            }
        }
        console.log(email)
        console.log(password)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    }

    return (<section className="login">
        <div className="login_text">
            <h1>Войдите в аккаунт, </h1>
            <h2>чтобы начать покупки</h2>
            <p>Если у вас нет учетной записи,<br />вы можете <Link to="/registration" className="link"><span>зарегистрироваться здесь!</span></Link></p>
        </div>
        <div className="login_inputs">
            <p>Войти</p>
            <input ref={emailRef} type="email" placeholder="Введите email" />
            <div className="password">
                <input ref={passwordRef} type={showPassword ? "text" : "password"} placeholder="Введите пароль" />
                <img src="/img/EyeIkon.svg" alt="EyeIkon" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}/>
            </div>
            <p>Забыли пароль?</p>
            <button type="submit" onClick={handleSubmit}>Войти</button>
            <p>или продолжить с</p>
            <div className="login_social_networks">
                <img src="/img/google.svg" alt="google" />
                <img src="/img/facebook.svg" alt="facebook" />
                <img src="/img/twitter.svg" alt="twitter" />
            </div>
        </div>
    </section>);
})
