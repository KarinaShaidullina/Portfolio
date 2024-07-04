import styles from './OtherProducts.module.css';
import {AppContext} from '../../AppContext.js';
import React from 'react';
import { Card } from '../Card';
import {observer} from 'mobx-react-lite';
import { fetchCategories, fetchAllProducts } from '../../http/catalogAPI.js';


export const  OtherProducts = observer(() => {
  const { catalog } = React.useContext(AppContext);
  const [categoriesFetching, setCategoriesFetching] = React.useState(true);
  const [productsFetching, setProductsFetching] = React.useState(true);

  React.useEffect(() => {
    fetchCategories()
    .then(data => {
        const categoriesMap = {};
        data.forEach(category => {
            categoriesMap[category.id] = category.name;
        });
        catalog.categories = categoriesMap;
    })
    .finally(() => setCategoriesFetching(false));
      
    fetchAllProducts(catalog.category, catalog.page, catalog.limit)
        .then(data => {
            catalog.products = data.rows
            catalog.count = data.count
        })
        .finally(() => setProductsFetching(false))
    // eslint-disable-next-line
}, [])

  return (
    <section className={styles.other_products}>
      <h2>Сопутствующие продукты</h2>
      <div className={styles.items}>
      {catalog.products.slice(4, 8).map
    (item =><Card
      key={item.id}
      data={item}
    />)}
    </div>
    </section>
  );
})
