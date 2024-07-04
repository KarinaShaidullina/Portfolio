import styles from './Team.module.css';
import { TeamCard } from '../TeamCard';

const arr = [
  {
    id: 1,
    img: '/img/Expert_1.png',
    name: 'Джовани Бакардо',
    speciality: 'Фермер',
    info: 'Джовани Бакардо родился и вырос в сельской местности, с детства увлекаясь сельским хозяйством. После получения высшего агрономического образования, он посвятил свою карьеру органическому земледелию.',
    education: 'Московский государственный аграрный университет, специальность "Агрономия"',
    qualification: 'Сертификат "Органическое земледелие", Курсы повышения квалификации по устойчивому сельскому хозяйству',
    skills: 'Органическое земледелие, управление фермерским хозяйством, планирование сельскохозяйственных работ, устойчивое развитие',
    experience: [
      'Фермерское хозяйство "Органика" (2015 - настоящее время): Основатель и главный фермер. Разработка и внедрение органических методов выращивания продуктов, контроль качества продукции, управление командой фермеров.', 
      'Фермерское хозяйство "Зеленый путь" (2010 - 2015): Помощник фермера. Участие в ежедневных сельскохозяйственных работах, внедрение новых технологий выращивания.'
    ],
    projects: [
      'Создание органической фермы "Органика": Джовани основал собственное фермерское хозяйство, полностью посвятив его органическому земледелию, и достиг высоких стандартов качества и экологичности продукции.',
      'Проект "Зеленый урожай": Разработка и реализация проекта по внедрению устойчивых сельскохозяйственных практик для повышения урожайности без использования химических удобрений.'
    ],
    img2: '/img/Experience_1.png',
    img3: '/img/Interests_1.png',
    publications: 'Статья "Органическое земледелие в современном мире" в журнале "АгроЭкология", выступление на конференции "Зеленая ферма 2022"',
    memberships: 'Член Ассоциации органического земледелия России',
    interests: 'Джовани увлекается ботаникой, путешествиями и кулинарией. В свободное время он любит проводить время с семьей и экспериментировать с новыми рецептами из выращенных на ферме продуктов.'
  },
  {
    id: 2,
    img: '/img/Expert_2.png',
    name: 'Марианна Лорено',
    speciality: 'Дизайнер'
  },
  {
    id: 3,
    img: '/img/Expert_3.png',
    name: 'Филимонова Маргарита',
    speciality: 'Журналист'
  }
]

export function Team({onArticleClick}) {
    return (
        <section className={styles.team}>
        <p className="green_title">Команда</p>
        <h2>Наши эксперты</h2>
        <p>У нас работают высококвалифицированные профессионалы с многолетним опытом работы в своей области. 
          Мы гордимся нашей командой экспертов, которые гарантируют высокое качество предоставляемых услуг.</p>
          <div className={styles.team_cards}>
        {arr.map((obj) => (
        <TeamCard
        key={obj.id} 
        id={obj.id} 
        img={obj.img} 
        name={obj.name} 
        speciality={obj.speciality}
        info={obj.info}
        education={obj.education}
        qualification={obj.qualification}
        skills={obj.skills}
        experience={obj.experience}
        projects={obj.projects}
        img2={obj.img2}
        img3={obj.img3}
        publications={obj.publications}
        memberships={obj.memberships}
        interests={obj.interests}
        onArticleClick={onArticleClick}/>
      ))}
        </div>
      </section>
    );
  }