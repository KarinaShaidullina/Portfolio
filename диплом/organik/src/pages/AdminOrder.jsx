import React from 'react';
import { adminGetOne as getOneOrder } from '../http/orderAPI.js';
import {Order} from '../components/Order';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../http/userAPI.js';
import { AppContext } from '../AppContext.js';
import { Header } from '../components/Header/index.js';
import {Loader} from '../components/Loader';

export const AdminOrder = () => {
    const { id } = useParams()
    const [order, setOrder] = React.useState(null)
    const [fetching, setFetching] = React.useState(true)
    const [error, setError] = React.useState(null)
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    React.useEffect(() => {
        getOneOrder(id)
            .then(
                data => setOrder(data)
            )
            .catch(
                error => setError(error.response.data.message)
            )
            .finally(
                () => setFetching(false)
            )
    }, [id])

    if (fetching) {
        return <Loader/>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <section>
            <Header/>
            <div className='user_main'>
                <h1>Панель управления</h1>
            </div>

            <div className='user_content'>
                <ul className='user_info'>
                    <li><Link className='link' to="/admin/orders">Заказы в магазине</Link></li>
                    <li><Link className='link' to="/admin/categories">Категории каталога</Link></li>
                    <li><Link className='link' to="/admin/products">Товары каталога</Link></li>
                    <button className='button' onClick={handleLogout}>Выйти</button>
                </ul>
                
                <div className='content_line'>
                    <h2>Заказ № {order.id}</h2>
                    <Order data={order} admin={true}/>
                </div>
            </div> 
        </section>
    )
}