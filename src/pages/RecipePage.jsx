import React from 'react';
import { useParams } from 'react-router-dom';
import { PostService } from '../API/PostService';
import { Link } from 'react-router-dom';
import styles from '../styles/recipePage.module.css';

const RecipePage = () => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [ingredients, setIngredients] = React.useState(['']);
    const [cookingSteps, setCookingSteps] = React.useState(['']);
    const [owner, setOwner] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const {recipe} = useParams();

    React.useEffect(() => {
        (async () => {
            if (recipe) {
                const data = await PostService.getRecipe(recipe);
                if (!data?.error && !!data[0]?.name) {
                    setName(data[0].name);
                    setDescription(data[0].description);
                    setImage(data[0].image);
                    setCategory(CATEGORIES[data[0].category - 1]);
                    setIngredients(data[0].ingredients);
                    setCookingSteps(data[0].cookingSteps);
                    const ownerStatus = await PostService.checkOwner(recipe);
                    setOwner(ownerStatus);
                }
            }
        })()
    },[])

    const handleDeletePopup = () => {
        setMessage('Вы уверены? После удаления рецепт будет невозможно восстановить.');
    };

    const handleDelete = async () => {
        const deleteStatus = await PostService.deleteRecipe(recipe);
        if (deleteStatus) {
            setMessage('Рецепт удален успешно');
        }
    };

    return (
        <>
            <article className={styles.container}>
                <div className={styles.recipe}>
                    {image ? <img src={image} alt={name} className={styles.image}/>
                        : <div className={styles.image}></div>
                    }
                    <div className={styles.info}>
                        <h1 className={styles.name}>{name}</h1>
                        <span className={styles.category}>{category}</span>
                        <h3>Описание:</h3>
                        <p className={styles.description}>{description}</p>
                        <h3>Ингредиенты и их количество:</h3>
                        <div className={styles.ingredients}>
                            {ingredients.map((ingredient, index)=>
                                <span key={index} className={styles.ingredient}>{index + 1}. {ingredient}</span>
                            )}
                        </div>
                        <h3>Шаги приготовления:</h3>
                        <div className={styles.steps}>
                            {cookingSteps.map((step, index)=>
                                <span key={index} className={styles.step}>Шаг {index + 1}: {step}</span>
                            )}
                        </div>
                        {owner && 
                            <div className={styles.buttons}>
                                <Link className='button' to={`/edit-recipes/${recipe}`}>Редактировать</Link>
                                <button className='button' onClick={handleDeletePopup}>Удалить</button>
                            </div>
                        }
                        {!!message && (
                            <div className={styles.popup}>
                                <div className={styles.row}>
                                    <span>{message}</span>
                                    {message === 'Рецепт удален успешно' &&
                                        <span onClick={() => setMessage('')} className={styles.cross}>&times;</span>
                                    }
                                </div>
                                {message !== 'Рецепт удален успешно' &&
                                    <div className={styles.row}>
                                        <button onClick={handleDelete} className='button'>Подтвердить</button>
                                        <button onClick={() => setMessage('')} className='button'>Отменить</button>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </>
    );
};

export default RecipePage;

const CATEGORIES = ['Закуски', 'Салаты', 'Первые блюда', 'Вторые блюда', 'Десерты', 'Напитки', 'Завтраки'];