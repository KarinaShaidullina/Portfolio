import styles from './Categories.module.css';
import { Card } from '../Card';
import React from 'react';
import {AppContext} from '../../AppContext.js';
import {observer} from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchAllProducts } from '../../http/catalogAPI.js';

export const Categories = observer(() => {
  const { catalog } = React.useContext(AppContext);
  const [categoriesFetching, setCategoriesFetching] = React.useState(true);
  const [productsFetching, setProductsFetching] = React.useState(true);
  const [categoryProducts, setCategoryProducts] = React.useState([]); // локальное состояние для продуктов
  const navigate = useNavigate();
  
  const handleClick = () => {
       navigate(`/shop`)
  };

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categories = await fetchCategories();
        const categoriesMap = {};
        categories.forEach((category) => {
          categoriesMap[category.id] = category.name;
        });
        catalog.categories = categoriesMap;
        setCategoriesFetching(false);

        const customLimit = 8;
        const products = await fetchAllProducts(null, 1, customLimit); // Fetching initial products for Categories component
        setCategoryProducts(products.rows);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setProductsFetching(false);
      }
    };

    fetchInitialData();
  }, []);

    return (
    <section className={styles.categories}>
    <p className="green_title">Категории</p>
    <h2>Наша продукция</h2>
    <div className='items'>
    {categoryProducts.map
    (item =><Card key={item.id} data={item} />)}
    </div>
    <button onClick={handleClick} className={styles.categories_button}>Загрузить ещё<span className="btn_arrow">&#129122;</span></button>
  </section>);
});

