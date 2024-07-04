import styles from './Gallery.module.css';

export function Gallery() {
    return (
    <section className={styles.gallery}>
    <div className={styles.gallery_item}>
      <img src="/img/OrganicJuice.png" alt="OrganicJuice" />
      <button>Органический сок</button>
    </div>
    <div className={styles.gallery_item}>
      <img src="/img/OrganicFood.png" alt="OrganicFood" />
      <button>Органические продукты</button>
    </div>
    <div className={styles.gallery_item}>
      <img src="/img/NutsCookis.png" alt="NutsCookis" />
      <button>Печенье с орехами</button>
    </div>
  </section>);
}