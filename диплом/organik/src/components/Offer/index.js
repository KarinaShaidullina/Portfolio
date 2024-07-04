import styles from './Offer.module.css';
import {AppContext} from '../../AppContext.js';
import React from 'react';
import { Card } from '../Card';
import {observer} from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchAllProducts } from '../../http/catalogAPI.js';


export const Offer = observer(() => {
  const { catalog } = React.useContext(AppContext);
  const [categoriesFetching, setCategoriesFetching] = React.useState(true);
  const [productsFetching, setProductsFetching] = React.useState(true);
  const [offerProducts, setOfferProducts] = React.useState([]); // локальное состояние для продуктов
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
        
        const customLimit = 4;
        const products = await fetchAllProducts(null, 3, customLimit); // Fetching initial products for Offer component
        setOfferProducts(products.rows);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setProductsFetching(false);
      }
    };

    fetchInitialData();
  }, [catalog]);

    console.log(catalog.products)

    return (<section className={styles.offer}>
    <p className="green_title">Предложения</p>
    <div className={styles.offer_title}>
      <h2>Органическая Продукция Специально Для Вас</h2>
      <button onClick={handleClick} className={styles.offer_button}>Просмотреть всё<span className="btn_arrow">&#129122;</span></button>
    </div>
    <div className={styles.offer_items}>
      
    {offerProducts.map
    (item =><Card
      key={item.id}
      data={item}
    />)}
    </div>
  </section>);
});
