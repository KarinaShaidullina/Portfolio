import { BrowserRouter } from "react-router-dom";
import React from "react";
import AppRouter from "./AppRouter";
import { AppContext } from "./AppContext.js";
import { check as checkAuth } from './http/userAPI.js';
import { fetchBasket } from './http/basketAPI.js';
import { observer } from 'mobx-react-lite';
import { Loader } from './components/Loader';
import axios from "axios";

const App = observer(() => {
  const { user, basket } = React.useContext(AppContext)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    Promise.all([checkAuth(), fetchBasket()])
        .then(
            axios.spread((userData, basketData) => {
                if (userData) {
                    user.login(userData)
                }
                basket.products = basketData.products
            })
        )
        .finally(
            () => setLoading(false)
        )
        // eslint-disable-next-line
    }, [])


  // показываем loader, пока получаем пользователя и корзину
  if (loading) {
      return <Loader/>
  }

  return (
    <BrowserRouter>
    <AppRouter/>
    </BrowserRouter>
  );
})

export default App
