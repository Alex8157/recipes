import React from 'react';
import { useParams } from 'react-router-dom';
import { PostService } from '../API/PostService';
import styles from '../styles/addEditRecipe.module.css';

const AddEditRecipe = () => {
    const [id, setId] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [ingredients, setIngredients] = React.useState(['']);
    const [cookingSteps, setCookingSteps] = React.useState(['']);
    const [message, setMessage] = React.useState('');

    const {recipe} = useParams();

    React.useEffect(() => {
        (async () => {
            if (recipe) {
                setId(recipe);
                const data = await PostService.getRecipe(recipe);
                if (!data?.error) {
                    setName(data[0].name);
                    setDescription(data[0].description);
                    setImage(data[0].image);
                    setCategory(CATEGORIES[data[0].category - 1]);
                    setIngredients(data[0].ingredients);
                    setCookingSteps(data[0].cookingSteps);
                }
            }
        })()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            setMessage('Имя не может быть пустым');
            return;
        }
        const categoryId = CATEGORIES.indexOf(category) + 1;
        if (categoryId < 1) {
            setMessage('Выберите категорию');
            return;
        }
        setMessage('Ожидание ответа вервера');
        if (id) {
            //редактировать
            const status = await PostService.editRecipe({ id, name, description, image, category: categoryId, ingredients, cookingSteps });
            if (status) {
                setMessage('Рецепт успешно обновлен');
                return;
            }
        } else {
            //создать
            const status = await PostService.addRecipe({ name, description, image, category: categoryId, ingredients, cookingSteps });
            if (status) {
                setMessage('Рецепт успешно добавлен');
                return;
            }
        }
    };


    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };
    
    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };
    
    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const handleCookingStepChange = (index, value) => {
        const updatedCookingStep = [...cookingSteps];
        updatedCookingStep[index] = value;
        setCookingSteps(updatedCookingStep);
    };
    
    const handleAddCookingStep = () => {
        setCookingSteps([...cookingSteps, '']);
    };
    
    const handleRemoveCookingStep = (index) => {
        const updatedCookingStep = [...cookingSteps];
        updatedCookingStep.splice(index, 1);
        setCookingSteps(updatedCookingStep);
    };

    return (
        <>
            <article className={styles.container}>
                <div className={styles.recipe}>
                    {image ? <img src={image} alt={name} className={styles.image}/>
                        : <div className={styles.image}></div>
                    }
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.label}>
                            Название:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`input ${styles.inputName}`}
                            />
                        </label>

                        <label className={styles.label}>
                            Ссылка на изображение:
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className={`input ${styles.inputImage}`}
                            />
                        </label>

                        <label className={styles.label}>
                            Описание:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`${styles.textarea} textarea`}
                            />
                        </label>

                        <label className={styles.label}>
                            Категория:
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={`input ${styles.category}`}
                            >
                                <option value="" >Выберите категорию</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </label>

                        <label className={`${styles.label} ${styles.ingredientsLabel}`}>
                            Ингредиенты и их количество:
                            <div className={styles.ingredientsContainer}>
                                {ingredients.map((ingredient, index) => (
                                    <label key={index} className={styles.ingredientLabel}>
                                        <span className={styles.ingredientNumber}>Ингредиент {index + 1}:</span>
                                        <input
                                            type="text"
                                            value={ingredient}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            className={`input ${styles.ingredientInput}`}
                                        />
                                        <span className={styles.cross} onClick={() => handleRemoveIngredient(index)}>
                                            &times;
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <button type="button" onClick={handleAddIngredient} className={`button ${styles.littleButton}`}>
                                Добавить ингредиент
                            </button>
                        </label>
                        
                        <label className={`${styles.label} ${styles.ingredientsLabel}`}>
                            Шаги приготовления:
                            <div className={styles.ingredientsContainer}>
                                {cookingSteps.map((cookingStep, index) => (
                                    <label key={index} className={styles.ingredientLabel}>
                                        <span className={styles.cookingStepNumber}>Шаг {index + 1}:</span>
                                        <input
                                            type="text"
                                            value={cookingStep}
                                            onChange={(e) => handleCookingStepChange(index, e.target.value)}
                                            className={`input ${styles.cookingStepsInput}`}
                                        />
                                        <span className={styles.cross} onClick={() => handleRemoveCookingStep(index)}>
                                            &times;
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <button type="button" onClick={handleAddCookingStep} className={`button ${styles.littleButton}`}>
                                Добавить шаг
                            </button>
                        </label>

                        <div className={styles.submit}>
                            <button type="submit" className={`button ${styles.button}`}>{id ? 'Редактировать' : 'Добавить'}</button>
                        </div>
                    </form>
                </div>
            </article>
            {!!message && (
                <div className={styles.popup}>
                    <span>{message}</span>
                    <span onClick={() => setMessage('')} className={styles.cross}>&times;</span>
                </div>
            )}
        </>
    );
};

export default AddEditRecipe;

const CATEGORIES = ['Закуски', 'Салаты', 'Первые блюда', 'Вторые блюда', 'Десерты', 'Напитки', 'Завтраки'];