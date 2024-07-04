import { Header } from '../components/Header';
import { OrderMain } from '../components/OrderMain';
import { OrderInfo } from '../components/OrderInfo';
import { Footer } from '../components/Footer';


export function Order() {
    return (
      <div>
        <Header/>
        <OrderMain/>
        <OrderInfo/>
        <Footer/>
      </div>
    );
}