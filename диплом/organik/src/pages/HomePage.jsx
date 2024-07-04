import { AboutUs } from '../components/AboutUs/index.js';
import { Categories } from '../components/Categories/index.js';
import { Eco } from '../components/Eco/index.js';
import { Footer } from '../components/Footer/index.js';
import { FruitsVegetables } from '../components/FruitsVegetables/index.js';
import { Gallery } from '../components/Gallery/index.js';
import { Header } from '../components/Header/index.js';
import { HomePage } from '../components/HomePage/index.js';
import { News } from '../components/News/index.js';
import { Offer } from '../components/Offer/index.js';
import { Subscribe } from '../components/Subscribe/index.js';
import { Testimonial } from '../components/Testimonial/index.js';
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  
  const handleArticleClick = (id) => {
       navigate(`/blog/${id}`)
       console.log(id)
    };
    return (
      <div>     
        <Header/>
        <HomePage/>
        <FruitsVegetables/>
        <AboutUs/>
        <Categories/>
        <Testimonial/>
        <Offer/>
        <Eco/>
        <Gallery/>
        <News onArticleClick={handleArticleClick}/>
        <Subscribe/>
        <Footer/>
      </div>
    );
}
  
