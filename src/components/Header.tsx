/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/components/Header.module.css'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react';

export default function Header({ black }) {
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const { 'nextauth.avatar': avatar_url } = parseCookies();
        setAvatar(avatar_url);
    }, [])

    return (
        <header className={`${black ? styles.black : ''} ${styles.header}`}>
            <div className={styles['header--logo']}>
                <a href="#">
                    <img src='/assets/letter-logo.png' alt="AnEx" />
                </a>
            </div>
            <div className={styles['header--info']}>
                <div className={styles.buttonsHeader}>
                    <button><img src='/assets/fav.svg' alt="AnEx" className={styles.favHeader} />Favoritos</button>
                    <button><img src='/assets/search.svg' alt="AnEx" />Pesquisar</button>
                </div>
                <div className={styles['header--user']}>
                    <a href="#">
                        <img src={avatar || '/assets/user-default.png'} alt="Usuário" style={{ borderRadius: '10px' }} />
                    </a>
                </div>
            </div>
        </header>
    );
}