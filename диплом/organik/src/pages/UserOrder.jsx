import React from 'react'
import { userGetOne as getOneOrder } from '../http/orderAPI.js'
import { Order } from '../components/Order'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header/index.js'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'
import { AppContext } from '../AppContext.js'

export const UserOrder = () => {
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
        return <p>Loading</p>
    }

    if (error) {
        return <p>{error}</p>
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
                    <p className='link' onClick={() => navigate(`/user/${user.id}`)}>Личные данные</p>
                    <button className='button' onClick={handleLogout}>Выйти</button>
                </div>
                
                <div className='content_line'>
                    <h2>Заказ № {order.id}</h2>
                    <Order data={order} admin={false}/>
                </div>
            </div>          
        </section>
    )
}