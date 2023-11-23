import React from 'react';
import { PostService } from '../API/PostService';
import styles from '../styles/authForm.module.css';

const AuthForm = ({closeAuthForm}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isRegistering, setIsRegistering] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = false;

    if (isRegistering) {
        result = await PostService.registration({ email, password });
    } else {
        result = await PostService.login({ email, password });
    }
    if (result) window.location.reload();
  };

  return (
    <div className={styles.container}>
        <span className={styles.cross} onClick={closeAuthForm}>&times;</span>
        <h2 className={styles.heading}>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
            Email:
            <input
                className='input'
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </label>
            <label className={styles.label}>
            Пароль:
            <input
                className='input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </label>
            <button className='button' type="submit">
                {isRegistering ? 'Зарегистрироваться' : 'Войти'}
            </button>
        </form>
        <p className={styles.toggleLink} onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Уже есть аккаунт? Войти.' : 'Нет аккаунта? Зарегистрироваться.'}
        </p>
    </div>
  );
};

export default AuthForm;
