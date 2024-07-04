import React from 'react'
import { userGetAll as getAllOrders } from '../http/orderAPI'
import {Orders} from '../components/Orders'
import { useContext } from 'react'
import { AppContext } from '../AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'
import { Header } from '../components/Header/index.js'

export const UserOrders = () => {
    const [orders, setOrders] = React.useState(null)
    const [fetching, setFetching] = React.useState(true)
    const { user } = useContext(AppContext)
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
    }, [])

    if (fetching) {
        return <p>Loading</p>
    }

    return (
        <section>
            <Header/>
            <div className='user_main'>
                <h1>Личный кабинет</h1>
            </div>
            
            <div className='user_content'>
                <div className='user_info'>
                    <Link className='link active' to="/user/orders">История заказов</Link>
                    <p className='link' onClick={() => navigate(`/user/${user.id}`)}>Личные данные</p>
                    <button className='button' onClick={handleLogout}>Выйти</button>
                </div>

                <div className='content_line'>
                        <h2>Ваши заказы</h2>
                        <Orders items={orders} admin={false} />
                </div>
            </div>
        </section>
    )
}