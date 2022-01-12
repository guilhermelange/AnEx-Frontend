/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/components/Footer.module.css';
import { useEffect, useState } from 'react';

export default function Footer() {
    const [windowWidth, setWindowWidth] = useState(0);
    const imageUrl = windowWidth >= 760 ? 'letter-logo.png' : 'logo.png';

    useEffect(() => {
        if (window !== undefined) {
            const handleWindowResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleWindowResize);
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            }
        }
    }, []);

    const today = new Date();
    return (
        <div className={styles.footer}>
            <div className={styles.headFooter}>
                <div className={styles.letterFooter}>
                    <img src={`/assets/${imageUrl}`} alt="letter" />
                    <p>@{today.getUTCFullYear()} Anime Experience.</p>
                </div>
                <div className={styles.navFooter}>
                    <a className={styles.footerAnchor} href="#">Feedback</a>
                    <a className={styles.footerAnchor} href="#"> Suporte</a>
                    <a className={styles.footerAnchor} href="#">FAQ</a>
                </div>

                <div className={styles.followFooter}>
                    <div>
                        <span>SIGA-NOS</span>
                    </div>
                    <a href="#"><img src='/assets/facebook.svg' alt="facebook" /></a>
                    <a href="#"><img className={styles.logoLast} src='/assets/instagram.svg' alt="instagram" /></a>
                </div>
            </div>
        </div>
    )
}