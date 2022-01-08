/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/components/Footer.module.css';

export default function Footer(props) {
    const today = new Date();
    return (
        <div className={styles.footer}>
            <div className={styles.headFooter}>
                <div className={styles.letterFooter}>
                    <img src='/assets/letter-logo.png' alt="letter" />
                    <p>@{today.getUTCFullYear()} Todos os direitos reservados.</p>
                </div>
                <div className={styles.navFooter}>
                    <a className={styles.footerAnchor} href="#">Feedback</a>
                    <a className={styles.footerAnchor} href="#"> Suporte</a>
                    <a className={styles.footerAnchor} href="#">FAQ</a>
                </div>

                <div className={styles.followFooter}>
                    <div>
                        <span className={styles.footerSpan}>SIGA-NOS</span></div>
                    <a href="#"><img src='/assets/facebook.svg' alt="facebook" /></a>
                    <a href="#"><img src='/assets/instagram.svg' alt="instagram" /></a>
                </div>
            </div>
        </div>
    )
}