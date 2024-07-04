import styles from './TestimonialCard.module.css';

export function TestimonialCard(props) {
    return (
        <div className={styles.card} id={props.id}>
            <img className={styles.customer_img} src={props.img} alt="Customer" />
            <p className={styles.testimonial_text}>{props.text}</p>
            <h3 className={styles.testimonial_subtitle}>{props.name}</h3>
            <p className={styles.testimonial_subtitle_text}>{props.role}</p>
        </div>
    );
}