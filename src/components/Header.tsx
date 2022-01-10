/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/components/Header.module.css'
import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AnimeContext } from '@/contexts/AnimeContext';
import Link from 'next/link';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { AuthContext } from '@/contexts/AuthContext';

interface HeaderRequest {
    favorite?: boolean;
}

export default function Header({ favorite }: HeaderRequest) {
    const { searchState: [textSearch, setTextSearch] } = useContext(AnimeContext);
    const { logout } = useContext(AuthContext);
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [blackHeader, setBlackHeader] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { query } = useRouter();

    useEffect(() => {
        let { 'nextauth.avatar': avatar_url, 'nextauth.name': username } = parseCookies();
        if (['null', 'undefined'].includes(avatar_url))
            avatar_url = ''
        setAvatar(avatar_url);

        const querySearch = query.q ? String(query.q) : ''
        if (querySearch) {
            setTextSearch(querySearch);
        }

        setUsername(username);
    }, [])

    useEffect(() => {
        const scroolListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scroolListener);
        return () => {
            window.removeEventListener('scroll', scroolListener);
        }
    }, []);

    function handleUserOptions(e) {
        setShowDropdown(!showDropdown);
    }

    return (
        <>
            <header className={`${blackHeader ? styles.black : ''} ${styles.header}`}>
                <div className={styles.headerContainer}>
                    <div className={styles['header--logo']}>
                        <a href={'/'}>
                            <img src='/assets/letter-logo.png' alt="AnEx" />
                        </a>
                    </div>
                    <div className={styles['header--info']}>
                        <div className={styles.buttonsHeader}>
                            <Link href={'/favorites'}>
                                <button><img src={ favorite ? '/assets/fav.svg' : '/assets/fav.svg'} alt="AnEx" className={styles.favHeader} />Favoritos</button>
                            </Link>
                            <div id={styles.divBusca}>
                                <input type="search" id={styles.txtBusca} placeholder='Buscar...' onChange={e => setTextSearch(e.target.value)} value={textSearch ?? ''} />
                                <Link href={`/search?q=${textSearch}`}>
                                    <img src="/assets/search.svg" alt="" id={styles.btnBusca} />
                                </Link>
                            </div>
                        </div>
                        
                        <div className={styles.dropdown}>
                            <div className={styles['header--user']}>
                                <a href="#" onClick={handleUserOptions}>
                                    <img src={avatar || '/assets/user-default.png'} alt="Usuário" style={{ borderRadius: '10px' }} />
                                </a>
                            </div>
                            <div id='userOptionsDropdown' className={`${styles['dropdown-content']} ${showDropdown ? styles['show'] : ''}`}>
                                <h6>Olá {username.split(' ')[0]}</h6>
                                <a href="#" onClick={logout}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div style={{ height: 70 }}></div>
        </>
    );
}