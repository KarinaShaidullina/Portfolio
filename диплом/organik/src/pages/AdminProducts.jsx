import React from 'react'
import { fetchCategories, fetchAllProducts, deleteProduct } from '../http/catalogAPI'
import {CreateProduct} from '../components/CreateProduct'
import {UpdateProduct} from '../components/UpdateProduct'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'
import { AppContext } from '../AppContext.js'
import { Header } from '../components/Header/index.js'
import { useContext } from 'react'

// количество товаров на страницу
const ADMIN_PER_PAGE = 4

export const AdminProducts = () => {
    const [products, setProducts] = React.useState([]) // список загруженных товаров
    const [fetching, setFetching] = React.useState(true) // загрузка списка товаров с сервера
    const [createShow, setCreateShow] = React.useState(false) // модальное окно создания товара
    const [updateShow, setUpdateShow] = React.useState(false) // модальное окно редактирования
    const [categories, setCategories] = React.useState({});
    const [categoriesFetching, setCategoriesFetching] = React.useState(true);
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = React.useState(false)
    // id товара, который будем редактировать — для передачи в <UpdateProduct id={…} />
    const [product, setProduct] = React.useState(null)

    // текущая страница списка товаров
    const [currentPage, setCurrentPage] = React.useState(1)
    // сколько всего страниц списка товаров
    const [totalPages, setTotalPages] = React.useState(1)

    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    // обработчик клика по номеру страницы
    const handlePageClick = (page) => {
        setCurrentPage(page)
        setFetching(true)
    }

    // содержимое компонента <Pagination>
    const pages = []
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <button
                key={page}
                className={page === currentPage ? "active" : ''}
                onClick={() => handlePageClick(page)}
            >
                {page}
            </button>
        )
    }

    const handleUpdateClick = (id) => {
        setProduct(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteProduct(id)
            .then(
                data => {
                    // если это последняя страница и мы удаляем на ней единственный
                    // оставшийся товар — то надо перейти к предыдущей странице
                    if (totalPages > 1 && products.length === 1 && currentPage === totalPages) {
                        setCurrentPage(currentPage - 1)
                    } else {
                        setChange(!change)
                    }
                    alert(`Товар «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    React.useEffect(() => {
        fetchCategories()
        .then(data => {
            const categoriesMap = {};
            data.forEach(category => {
                categoriesMap[category.id] = category.name;
            });
            setCategories(categoriesMap);
        })
        .finally(() => setCategoriesFetching(false));
        fetchAllProducts(null, currentPage, ADMIN_PER_PAGE)
            .then(
                data => {
                    setProducts(data.rows)
                    setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE))
                }
            )
            .finally(
                () => setFetching(false)
            )
           
    }, [change, currentPage])

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    if (fetching) {
        return <p>Loading</p>
    }

    return (
        <section>
            <Header/>
            <div className='user_main'>
                <h1>Панель управления</h1>
            </div>

            <div className='user_content product'>
                <ul className='user_info'>
                    <li><Link className='link' to="/admin/orders">Заказы в магазине</Link></li>
                    <li><Link className='link' to="/admin/categories">Категории каталога</Link></li>
                    <li><Link className='link active' to="/admin/products">Товары каталога</Link></li>
                    <button className='button' onClick={handleLogout}>Выйти</button>
                </ul>
                
                <div className='content_line_product'>
                    <h2>Товары</h2>
                    <button className='admin_button_product' onClick={() => setCreateShow(true)}>Создать товар</button>
                    <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} />
                    <UpdateProduct id={product} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
                    {products.length > 0 ? (
                        <>
                            <table className='product_table'>
                            <thead className='product_table_th'>
                                <tr >
                                    <th className='column'>Название</th>
                                    <th className='column'>Фото</th>
                                    <th className='column'>Категория</th>
                                    <th className='column'>Старая цена</th>
                                    <th className='column'>Текущая цена</th>
                                    <th className='column'>Краткое описание</th>
                                    <th className='column'>Подробное описание</th>
                                    <th className='column'>Дополнительная информация</th>
                                    <th className='column'>Редактировать</th>
                                    <th className='column'>Удалить</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(item => 
                                    <tr key={item.id}>
                                        <td className='column'>{item.name}</td>
                                        <td className='column'>
                                            {item.img &&
                                            <a className='link' href={process.env.REACT_APP_IMG_URL + item.img} target="_blank" rel="noopener noreferrer">фото</a>}
                                        </td>
                                        <td className='column'>{categories[item.categoryId] || 'NULL'}</td>
                                        <td className='column'>{item.old_price}</td>
                                        <td className='column'>{item.current_price}</td>
                                        <td className='column'>{truncateText(item.description, 100)}</td>
                                        <td className='column'>{truncateText(item.product_description, 100)}</td>
                                        <td className='column'>{truncateText(item.additional_info, 100)}</td>
                                        <td className='column'>
                                            <button className='edit_button' onClick={() => handleUpdateClick(item.id)}>
                                                Редактировать
                                            </button>
                                        </td>
                                        <td className='column'>
                                            <button className='edit_button' onClick={() => handleDeleteClick(item.id)}>
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            </table>
                            {totalPages > 1 && <div className="pagination">{pages}</div>}
                        </>
                    ) : (
                        <p>Список товаров пустой</p>
                    )}
                </div>
            </div>         
        </section>
    )
}
