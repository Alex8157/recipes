import React from 'react';
import { Outlet, useNavigate, useLocation   } from 'react-router-dom';
import { PostService } from '../API/PostService';
import Header from './Header';
import AuthForm from './AuthForm'
import styles from '../styles/layout.module.css';

const Layout = () => {
    const [auth, setAuth] = React.useState(false);
    const [expectation, setExpectation] = React.useState(true);
    const [authForm, setAuthForm] = React.useState(false);

    const regex = /\/recipes\/\d{1,}$/;
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        (async () => {
            const status = await PostService.checkAuth();
            setAuth(status);
            setExpectation(false);
        })()
    },[])

    React.useEffect(() => {
        const url = location.pathname;
        if (!auth && !expectation && url !== '/' && !regex.test(url)) {
            navigate('/');
        }
    }, [auth, expectation, location.pathname, navigate]);

    return (
        <>
            <Header auth={auth} expectation={expectation} changeAuthForm={() => setAuthForm(prev => !prev)}/>
            <main className={styles.container}>
                <Outlet/>
            </main>
            { authForm && <AuthForm closeAuthForm={() => setAuthForm(false)}/> }
        </>
    );
};

export default Layout;
