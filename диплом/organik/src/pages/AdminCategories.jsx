import React from 'react';
import { fetchCategories, deleteCategory } from '../http/catalogAPI.js';
import {EditCategory} from '../components/EditCategory';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'
import { AppContext } from '../AppContext.js'
import { Header } from '../components/Header/index.js'
import { useContext } from 'react'

export const AdminCategories = () => {
    const [categories, setCategories] = React.useState(null) // список загруженных категорий
    const [fetching, setFetching] = React.useState(true) // загрузка списка категорий с сервера
    const [show, setShow] = React.useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = React.useState(false)
    // id категории, которую будем редактировать — для передачи в <EditCategory id={…} />
    const [categoryId, setCategoryId] = React.useState(null)
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    const handleCreateClick = () => {
        setCategoryId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setCategoryId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteCategory(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Категория «${data.name}» удалена`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    React.useEffect(() => {
        fetchCategories()
            .then(
                data => setCategories(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <p>Loader</p>
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
                    <li><Link className='link active' to="/admin/categories">Категории каталога</Link></li>
                    <li><Link className='link' to="/admin/products">Товары каталога</Link></li>
                    <button className='button' onClick={handleLogout}>Выйти</button>
                </ul>
                
                <div className='content_line'>
                    <h2>Категории</h2>
                    <button className='admin_button' onClick={() => handleCreateClick()}>Создать категорию</button>
                    <EditCategory id={categoryId} show={show} setShow={setShow} setChange={setChange} />
                    {categories.length > 0 ? (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Редактировать</th>
                                    <th>Удалить</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(item => 
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>
                                            <button className='edit_button' onClick={() => handleUpdateClick(item.id)}>Редактировать</button>
                                        </td>
                                        <td>
                                            <button className='edit_button' onClick={() => handleDeleteClick(item.id)}>Удалить</button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    ) : ( <p>Список категорий пустой</p>)}
                </div>
            </div>       
        </section>
)}