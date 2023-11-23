import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PostService } from '../API/PostService';
import Card from '../components/Card';
import styles from '../styles/cardsPage.module.css';

const CategoryPage = ()=>{
    const [recipes, setRecipes] = React.useState([]);

    const {category} = useParams();

    React.useEffect(() => {
        (async () => {
            if (category) {
                const data = await PostService.getCategory(category);
                if (!data?.error) {
                    setRecipes(data);
                }
            } else {
                const data = await PostService.getAllRecipes();
                if (!data?.error) {
                    setRecipes(data);
                }
            }
        })()
    },[])

    return (
        <article className={styles.cards}>
            {recipes.map((recipe) => 
                <Link to={`/recipes/${recipe.id}`} key={recipe.id} className={styles.card}>
                    <Card name={recipe.name} image={recipe.image}/>
                </Link>
            )}
        </article>
    );
};

export default CategoryPage;