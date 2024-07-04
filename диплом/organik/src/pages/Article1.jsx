import { Footer } from '../components/Footer/index.js';
import { Header } from '../components/Header/index.js';
import { BlogSingleMain } from '../components/BlogSingleMain/index.js';
import { ArticleText }  from '../components/ArticleText/index.js';

export function Article1() { 
    return (
      <div>
        <Header/>
        <BlogSingleMain/>
        <ArticleText/>
        <Footer/>
      </div>
    );
}