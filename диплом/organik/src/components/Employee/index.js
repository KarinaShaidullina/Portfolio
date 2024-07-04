import styles from './Employee.module.css';
import { useLocation } from 'react-router-dom';

export function Employee() {
    const location = useLocation();
    const { employeeData } = location.state || {};
    return (
        <section key={employeeData?.id} className={styles.content}>
            <div className={styles.content_card}>
                <img className={styles.img} src={employeeData.img} alt="Employee"/>
                <div className={styles.card_text}>
                    <h2>{employeeData.name}</h2>
                    <h3>Профессиональная информация:</h3>
                    <p className={styles.subtitle}>Краткая биография</p>
                    <p>{employeeData.info}</p>
                    <p className={styles.subtitle}>Образование</p>
                    <p>{employeeData.education}</p>
                    <p className={styles.subtitle}>Квалификации и сертификаты</p>
                    <p>{employeeData.qualification}</p>
                    <p className={styles.subtitle}>Основные профессиональные навыки</p>
                    <p>{employeeData.skills}</p>
                </div>
            </div>
            <div className={styles.content_card}>
                <div className={styles.card_text}>
                    <h3>Опыт работы</h3>
                    {employeeData?.experience?.map((item, index) => (
                    <p key={index}>{item}</p>))}
                    <h3>Проекты</h3>
                    {employeeData?.projects?.map((project, index) => (
                    <p key={index}>{project}</p>))}
                </div> 
                <img src={employeeData.img2} alt="Experience"/>
            </div>
            <div className={styles.content_card}>
                <img src={employeeData.img3} alt="Interests"/>
                <div className={styles.card_text}>
                    <h3>Дополнительная информация</h3>
                    <p className={styles.subtitle}>Публикации и выступления</p>
                    <p>{employeeData.publications}</p>
                    <p className={styles.subtitle}>Профессиональные ассоциации и членства</p>
                    <p>{employeeData.memberships}</p>
                    <p className={styles.subtitle}>Личные увлечения и интересы</p>
                    <p>{employeeData.interests}</p>
                </div>
            </div>
        </section>
    );
}