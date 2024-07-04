import styles from './TeamCard.module.css';

export function TeamCard(props) {
    const handleClick = () => {
      props.onArticleClick({
        id: props.id,
        img: props.img,
        name: props.name,
        speciality: props.speciality,
        info: props.info,
        education: props.education,
        qualification: props.qualification,
        skills: props.skills,
        experience: props.experience,
        projects: props.projects,
        img2: props.img2,
        img3: props.img3,
        publications: props.publications,
        memberships: props.memberships,
        interests: props.interests
      });
    };
    
    return (
        <div className={styles.team_card} id={props.id} onClick={handleClick}>
            <img className={styles.team_card_img} src={props.img} alt="Expert"/>
            <h3>{props.name}</h3>
            <div className={styles.team_card_social_network}>
              <p className={styles.green_subtitle}>{props.speciality}</p>
              <div>
                <img src="/img/Instagram.png" alt="Instagram"/>
                <img src="/img/Facebook.png" alt="Facebook"/>
                <img src="/img/Twitter.png" alt="Twitter"/>
              </div>
            </div>
          </div>
    );
}