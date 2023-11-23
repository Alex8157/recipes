import styles from '../styles/card.module.css';

const Card = ({name, image})=>{

    return (
        <section className={styles.card}>
            {image ? <img src={image} alt={name} className={styles.image}/>
                : <div className={styles.image}></div>
            }
            <h3 className={styles.name}>{name}</h3>
        </section>
    );
};

export default Card;