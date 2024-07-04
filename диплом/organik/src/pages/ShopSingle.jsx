import { CardSingle } from '../components/CardSingle/index.js';
import { CardSingleDescrip } from '../components/CardSingleDescrip/index.js';
import { Footer } from '../components/Footer/index.js';
import { Header } from '../components/Header/index.js';
import { OtherProducts } from '../components/OtherProducts/index.js';
import { ShopSingleMain } from '../components/ShopSingleMain/index.js';
import { Subscribe } from '../components/Subscribe/index.js';


export function ShopSingle() {
    return (
      <div>
        <Header/>
        <ShopSingleMain/>
        <CardSingle/>
        <CardSingleDescrip/>
        <OtherProducts/>
        <Subscribe/>
        <Footer/>
      </div>
    );
}
  
