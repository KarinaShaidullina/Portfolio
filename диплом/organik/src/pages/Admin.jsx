import React from 'react'
import { AppContext } from '../AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'
import { Header } from '../components/Header/index.js'

export const Admin = () => {
    const { user } = React.useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
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

            <div className='content_line'></div>
            </div>
            
        </section>
    )
}