import { Header } from "../components/Header";
import { Subscribe } from "../components/Subscribe";
import { Footer } from "../components/Footer";
import { ShopMain } from "../components/ShopMain";
import { Catalog } from "../components/Catalog";


export function Shop(){
    return(
    <div>
        <Header/>
        <ShopMain/>
        <Catalog/>
        <Subscribe/>
        <Footer/>
    </div>);
}

