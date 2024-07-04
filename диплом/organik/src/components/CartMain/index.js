import styles from "./CartMain.module.css";
import React from "react";
import { AppContext } from "../../AppContext";
import { increment, decrement, remove } from "../../http/basketAPI";
import { EmptyCart } from "../EmptyCart";
import { Subtotal } from "../Subtotal";
import { CartBackground } from "../CartBackground";
import { observer } from "mobx-react-lite";
import { CartCard } from "../CartCard";
// import {Loader} from '../Loader';

export const CartMain = observer(() => {
  const { basket } = React.useContext(AppContext);
  const [fetching, setFetching] = React.useState(false);

  const handleIncrement = (id) => {
    setFetching(true);  
    increment(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  const handleDecrement = (id) => {
    setFetching(true);
    decrement(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  const handleRemove = (id) => {
    setFetching(true);
    remove(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  // if (fetching) {
  //   return <Loader/>;
  // }

  return (
    <>
      {basket.count ? (
        <section className={styles.cart_main}>
          <CartBackground />
          {basket.products.map((item) => (
            <CartCard
              key={item.id}
              increment={handleIncrement}
              decrement={handleDecrement}
              remove={handleRemove}
              sum={(sum, item) => sum + item.price * item.quantity}
              {...item}
            />
          ))}
          <Subtotal sum={basket.sum}/>
        </section>
      ) : (
        <EmptyCart/>
      )}
    </>
  );
});
