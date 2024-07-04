import styles from './Loader.module.css'

export const Loader = () => {
    return (
        <section className={styles.loader}>
            <div className={styles.custom_loader}></div>
        </section>
    )
}
