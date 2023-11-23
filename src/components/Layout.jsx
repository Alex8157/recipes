import React from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';
import { PostService } from '../API/PostService';
import Header from './Header';
import AuthForm from './AuthForm'
import styles from '../styles/layout.module.css';

const Layout = () => {
    const [auth, setAuth] = React.useState(false);
    const [expectation, setExpectation] = React.useState(false);
    const [authForm, setAuthForm] = React.useState(false);

    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            setExpectation(true);
            const status = await PostService.checkAuth();
            setAuth(status);
            setExpectation(false);
            if (!status && window.location.pathname !== '/' && !window.location.pathname.startsWith('/recipes/')) {
                navigate('/');
            }
        })()
    },[])


    return (
        <>
            <Header auth={auth} expectation={expectation} changeAuthForm={() => setAuthForm(prev => !prev)}/>
            {(auth || window.location.pathname.startsWith('/recipes/')) &&
                <main className={styles.container}>
                    <Outlet/>
                </main>
            }
            { authForm && <AuthForm closeAuthForm={() => setAuthForm(false)}/> }
        </>
    );
};

export default Layout;
