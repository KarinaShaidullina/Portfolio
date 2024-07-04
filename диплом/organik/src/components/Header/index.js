import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { AppContext } from '../../AppContext.js';
import { useNavigate } from "react-router-dom";
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
  const { user, basket, catalog } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const results = catalog.products.filter(product => {    
        if (!product) return false;
        const productName = product.name ? product.name.toLowerCase() : '';
        const categoryName = (product.categoryId && catalog.categories[product.categoryId] && catalog.categories[product.categoryId].name) ? catalog.categories[product.categoryId].name.toLowerCase() : '';
        return productName.includes(searchQuery.toLowerCase()) || categoryName.includes(searchQuery.toLowerCase());  
    });
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`, { state: { results: JSON.stringify(results) } });
  };


  return (
    <header className={styles.header}>
    <nav className={styles.header__nav}>
      <img className={styles.logo} src="/img/Logo.svg" alt="Logo" />
      <ul className={styles.header__nav__list}>
        <Link to="/" className={styles.header__nav__link}>Главная</Link>
        <Link to="/about" className={styles.header__nav__link}>О Нас</Link>
        <Link to="/shop" className={styles.header__nav__link}>Каталог</Link>
        <Link to="/blog" className={styles.header__nav__link}>Блог</Link>
        {user.isAuth ? (
        user.isAdmin ? (
            <li onClick={() => navigate(`/admin/${user.id}`)} className={styles.header__nav__link}><img src="/img/AdminPanel.svg" alt="AdminPanel"/></li>
        ) : (
            <li onClick={() => navigate(`/user/${user.id}`)} className={styles.header__nav__link}><img src="/img/User.svg" alt="User"/></li>)
        ) : (
            <Link to="/login" className={styles.header__nav__link}>Войти</Link>)}
      </ul>

      <div className={styles.search}>
        <input className={styles.search_input} type="text" value={searchQuery} onChange={handleInputChange} />
        <button className={styles.search_button} onClick={handleSearch}><img src="/img/Search.svg" alt="Search"/></button>
      </div>
    
      <Link to="/basket" className={styles.header__nav__link}><div className={styles.cart}>
        <img src="/img/Cart.svg" alt="Cart" />
        <p>Корзина</p>
        <p className={styles.cart_count}>({basket.count})</p>
      </div></Link> 
    </nav>
    </header>);
});