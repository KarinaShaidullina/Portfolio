import { Footer } from '../components/Footer/index.js';
import { Header } from '../components/Header/index.js';
import { OurTeam } from '../components/OurTeam/index.js';
import { Subscribe } from '../components/Subscribe/index.js';
import { TeamMain } from '../components/TeamMain/index.js';
import { useNavigate } from "react-router-dom";
import React from 'react';

export function Team() { 
  const navigate = useNavigate();

  const handleArticleClick = (employeeData) => {
    navigate(`/team/${employeeData.id}`, { state: { employeeData } });
    console.log(employeeData);
  };
  
    return (
        <div>
          <Header/>
          <TeamMain/>
          <OurTeam onArticleClick={handleArticleClick}/>
          <Subscribe/>
          <Footer/>
        </div>
      );
}