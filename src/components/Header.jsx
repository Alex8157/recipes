import { Link } from 'react-router-dom';
import { PostService } from '../API/PostService';
import styles from '../styles/header.module.css';

const Header = ({auth, expectation, changeAuthForm}) => {
    const handleLogOut = async () => {
        const result = await PostService.logout();
        if (result) window.location.reload();
    };

      
    return (
        <header className={styles.header}>
            {expectation ? <span className={`button ${styles.expectation}`}>Ожидание ответа сервера</span> :
                <>
                    {!auth && <button  className='button' onClick={changeAuthForm}>Вход/Регистрация</button>}
                    {auth && <Link to="/recipes" className='button'>Все рецепты</Link>}
                    {auth && <Link to="/" className='button'>Категории</Link>}
                    {auth && <Link to="/add-recipes" className='button'>Добавить рецепт</Link>}
                    {auth && <Link to="/profile" className='button'>Профиль</Link>}
                    {auth && <button onClick={handleLogOut} className='button'>Выйти</button>}
                </>
            }
        </header>
    );
};

export default Header;
