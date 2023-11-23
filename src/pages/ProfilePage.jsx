import React from 'react';
import { PostService } from '../API/PostService';
import styles from '../styles/profilePage.module.css';

const ProfilePage = () => {
    const [email, setEmail] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const newEmail = await PostService.getEmail();
            setEmail(newEmail);
        })()
    },[])

    const handleUpdateProfile = () => {
        if (!!newPassword){
            if (!!newPassword && newPassword === confirmPassword) {
                setShowConfirmation(true);
            } else setMessage('Пароли должны совпадать');
        } else setMessage('Пароль не может быть пустым');
    };

    const confirmUpdate = async () => {
        const status = await PostService.updateUser({email, password: newPassword});
        if (status) {
            setShowConfirmation(false);
            setNewPassword('');
            setConfirmPassword('');
            setMessage('Данные успешно изменены');
        }
    };

    const cancelUpdate = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            <div>
                <label>
                    Почта:
                    <input className='input' type="text" value={email} readOnly />
                </label>
            </div>
            <div>
                <label>
                    Новый пароль:
                    <input
                        className='input'
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Новый пароль:
                    <input
                        className='input'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <button onClick={handleUpdateProfile} className='button'>Изменить данные</button>
            </div>
            {showConfirmation && (
                <div className={styles.popupWithButtons}>
                    <span>Вы уверены, что хотите изменить данные?</span>
                    <div className={styles.buttonRow}>
                        <button onClick={confirmUpdate} className='button'>Подтвердить</button>
                        <button onClick={cancelUpdate} className='button'>Отмена</button>
                    </div>
                </div>
            )}
            {!!message && (
                <div className={styles.popup}>
                    <span>{message}</span>
                    <span onClick={() => setMessage('')} className={styles.cross}>&times;</span>
                </div>
            )}
        </div>
    );
};

    export default ProfilePage;