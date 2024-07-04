import { Articles } from '../components/Articles/index.js';
import { Footer } from '../components/Footer/index.js';
import { Header } from '../components/Header/index.js';
import { NewsMain } from '../components/NewsMain/index.js';
import { Subscribe } from '../components/Subscribe/index.js';
import { useNavigate } from "react-router-dom";
import React from 'react';


export function Blog() {
  const navigate = useNavigate();
  
  const handleArticleClick = (id) => {
       navigate(`/blog/${id}`)
       console.log(id)
    };
    return (
      <div>
        <Header/>
        <NewsMain/>
        <Articles onArticleClick={handleArticleClick}/>
        <Subscribe/>
        <Footer/>
      </div>
    );
}
  
