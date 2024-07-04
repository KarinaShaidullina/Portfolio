import { Footer } from '../components/Footer/index.js';
import { Header } from '../components/Header/index.js';
import { Subscribe } from '../components/Subscribe/index.js';
import { SearchResults } from '../components/SearchResults/index.js';

export function Search() {
      return (
        <div>     
          <Header/>
          <SearchResults/>
          <Subscribe/>
          <Footer/>
        </div>
      );
  }