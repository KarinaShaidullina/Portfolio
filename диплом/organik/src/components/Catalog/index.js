import styles from "./Catalog.module.css";
import { AppContext } from "../../AppContext";
import React from "react";
import { Card } from "../Card";
import { observer } from "mobx-react-lite";
import { fetchCategories, fetchAllProducts } from "../../http/catalogAPI.js";
import { useNavigate, createSearchParams, useLocation, useSearchParams} from "react-router-dom";

const getSearchParams = (searchParams) => {
  let category = searchParams.get("category");
  if (category && /[1-9][0-9]*/.test(category)) {
    category = parseInt(category);
  }
  let page = searchParams.get("page");
  if (page && /[1-9][0-9]*/.test(page)) {
    page = parseInt(page);
  }
  return { category, page };
};

export const Catalog = observer(() => {
  const { catalog } = React.useContext(AppContext);
  const [categoriesFetching, setCategoriesFetching] = React.useState(true);
  const [productsFetching, setProductsFetching] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

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
        
        const { category, page } = getSearchParams(searchParams);
        catalog.category = category;
        catalog.page = page ?? 1;

        const customLimit = 8;
        const products = await fetchAllProducts(catalog.category, catalog.page, customLimit);
        catalog.products = products.rows;
        catalog.count = products.count;
        catalog.limit = customLimit;
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setProductsFetching(false);
      }
    };

    fetchInitialData();
    // eslint-disable-next-line
  }, []);
 
  const handleClick = (page) => {
    catalog.page = page;
    const params = {};
    if (catalog.category) params.category = catalog.category;
    if (catalog.page > 1) params.page = catalog.page;
    navigate({
      pathname: "/shop",
      search: "?" + createSearchParams(params),
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsFetching(true);
        const { category, page } = getSearchParams(searchParams);

        if (category !== undefined && category !== catalog.category) {
          catalog.category = category;
        }
        if (page !== undefined && page !== catalog.page) {
          catalog.page = page ?? 1;
        }

        const products = await fetchAllProducts(catalog.category, catalog.page, catalog.limit);
        catalog.products = products.rows;
        catalog.count = products.count;
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setProductsFetching(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [location.search]);

  const pages = []
    for (let page = 1; page <= catalog.pages; page++) {
        pages.push(
            <button
                key={page}
                className={page === catalog.page ? styles.active : ''}
                onClick={() => handleClick(page)}
            >
                {page}
            </button>
        )
  }

  return (
    <section className={styles.catalog}>
      <div className="items">
        {catalog.products.slice(0, 8).map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
      {catalog.pages > 1 && <div className={styles.pagination}>{pages}</div>}
    </section>
  );
});
