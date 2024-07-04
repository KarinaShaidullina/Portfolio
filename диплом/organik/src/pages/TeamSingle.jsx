import { Employee } from '../components/Employee/index.js';
import { Footer } from '../components/Footer/index.js';
import { Header } from '../components/Header/index.js';
import { TeamSingleMain } from '../components/TeamSingleMain/index.js';
import { Subscribe } from '../components/Subscribe/index.js';

export function TeamSingle() { 
    return (
        <div>
          <Header/>
          <TeamSingleMain/>
          <Employee/>
          <Subscribe/>
          <Footer/>
        </div>
      );
}