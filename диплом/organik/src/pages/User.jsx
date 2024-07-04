import { useContext } from 'react'
import { AppContext } from '../AppContext.js'
import { UserInfo } from '../components/UserInfo/index.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout, getOne } from '../http/userAPI.js'
import { Header } from '../components/Header/index.js'
import React from 'react'
import { useParams } from 'react-router-dom'

export const User = () => {
    const { id } = useParams()
    const [user, setUser] = React.useState(null);
    const [fetching, setFetching] = React.useState(true);
    const [error, setError] = React.useState(null);
    const { user: appUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = (event) => {
        logout();
        appUser.logout();
        navigate('/login', { replace: true });
    };

    React.useEffect(() => {
        getOne(id)
            .then(
                data => setUser(data)
            )
            .catch(
                error => setError(error.response.data.message)
            )
            .finally(
                () => setFetching(false)
            )
    }, [id])

    if (fetching) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <section>
            <Header/>
            <div className='user_main'>
                <h1>Личный кабинет</h1>
            </div>
            
            <div className='user_content'>
                <div className='user_info'>
                    <Link className='link' to="/user/orders">История заказов</Link>
                    <Link onClick={() => navigate(`/user/${user.id}`)} className='link active'>Личные данные</Link>
                    <button className='button' onClick={handleLogout}>Выйти</button>
                </div>

                {user && (
                <div className='content_line'>
                    <h2>Учетная запись</h2>
                    <UserInfo data={user} admin={false}/>
                </div>
                )}
            </div>        
        </section>
    )
}

