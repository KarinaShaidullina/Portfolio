import { AboutMain } from "../components/AboutMain";
import { ChooseUs } from "../components/ChooseUs";
import { ChooseUsCards } from "../components/ChooseUsCards";
import { Creative } from "../components/Creative";
import { Header } from "../components/Header";
import { Team } from "../components/Team";
import { WeOffer } from "../components/WeOffer";
import { Subscribe } from "../components/Subscribe";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

export function About(){
    const navigate = useNavigate();
  
    const handleArticleClick = (employeeData) => {
        navigate(`/team/${employeeData.id}`, { state: { employeeData } });
        console.log(employeeData);
    };
    
    return(
    <div>
        <Header/>
        <AboutMain/>
        <Creative/>
        <ChooseUs/>
        <ChooseUsCards/>
        <Team onArticleClick={handleArticleClick}/>
        <WeOffer/>
        <Subscribe/>
        <Footer/>
    </div>);
}

