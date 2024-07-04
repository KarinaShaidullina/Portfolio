import styles from './NewsCard.module.css';

export function NewsCard(props) {
  const handleClick = () => {
    props.onArticleClick(props.id);
};
    return (
        <div className={styles.news_card} id={props.id}>
        <img className={styles.news_card_background} src={props.img} alt="News"/>
        <p className={styles.news_card_round}>{props.news_card_round}</p>
        <div className={styles.news_card_content}>
          <div className={styles.news_card_content_text}>
            <img src="/img/NewsIconYellow.svg" alt="NewsIconYellow"/>
            <p>{props.name}</p>
          </div>
          <h3>{props.title}</h3>
          <p>{props.text}</p>
         <button className={styles.news_card_content_button} onClick={handleClick}>Подробнее<span className="btn_arrow">&#129122;</span></button>
        </div>
      </div>
    );
}