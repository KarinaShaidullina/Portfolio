import React from 'react';
import { adminGetAll as getAllOrders } from '../http/orderAPI.js';
import {Orders} from '../components/Orders';
import { CreateOrder } from '../components/CreateOrder/index.js';
import { Header } from '../components/Header/index.js';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../http/userAPI.js';
import { AppContext } from '../AppContext.js';
import {Loader} from '../components/Loader';

export const AdminOrders = () => {
    const [orders, setOrders] = React.useState(null)
    const [fetching, setFetching] = React.useState(true)
    const [show, setShow] = React.useState(false)
    const [change, setChange] = React.useState(false)
    const { user } = React.useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    React.useEffect(() => {
        getAllOrders()
            .then(
                data => setOrders(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Loader/>
    }

    return (
        <section>
            <Header/>
            <div className='user_main'>
                <h1>Панель управления</h1>
            </div>
            
            <div className='user_content'>
                <ul className='user_info'>
                    <li><Link className='link active' to="/admin/orders">Заказы в магазине</Link></li>
                    <li><Link className='link' to="/admin/categories">Категории каталога</Link></li>
                    <li><Link className='link' to="/admin/products">Товары каталога</Link></li>
                    <button className='button' onClick={handleLogout}>Выйти</button>
                </ul>

                <div className='content_line'>
                    <h2>Все заказы</h2>
                    <button className='admin_button' onClick={() => setShow(true)}>Создать заказ</button>
                    <CreateOrder show={show} setShow={setShow} setChange={setChange}/>
                    <Orders items={orders} admin={true} />
                </div>
            </div>       
        </section>
    )
}