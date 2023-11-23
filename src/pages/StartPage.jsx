import React from 'react';
import { Link } from 'react-router-dom';
import { PostService } from '../API/PostService';
import Card from '../components/Card';
import styles from '../styles/cardsPage.module.css';

const StartPage = ()=>{
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const data = await PostService.getCategories();
      if (!data?.error) {
        setCategories(data);
      }
    })()
  },[])

  return (
    <article className={styles.cards}>
      {categories.map((category) => 
        <Link to={`/categories/${category.id}`} key={category.id} className={styles.card}>
          <Card name={category.name} image={category.image}/>
        </Link>
      )}
    </article>
  );
};

export default StartPage;