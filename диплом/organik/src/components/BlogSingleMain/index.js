import styles from './BlogSingleMain.module.css';

export function BlogSingleMain() {
  return (
    <section className={styles.article_summary}>
        <img className={styles.article_summary_background} src="/img/BlogSingle.png" alt="BlogSingle"/>
        <div className={styles.article_summary_content}>
            <div className={styles.article_summary_content_title}>
                <p><b>Опубликовано:</b> 6 Января, 2022</p>
                <img src="/img/NewsIconGreen.svg" alt="NewsIconGreen"/>
                <p>By Rachi Card</p>
            </div>
            <h3>Исследование органических продуктов</h3>
            <p>Изучение органических продуктов помогает углубить знания о их полезных свойствах, происхождении и способах использования, 
                способствуя более осознанному выбору продуктов для здорового образа жизни и устойчивого потребления.</p>
        </div>
    </section>
  );
}