import { useContext, useState } from "react";
import Swal from 'sweetalert2';
import { GOOGLE_CLIENT_ID } from "@/services/auth";
import { SwalError } from '@/utils/swalConfigs'
import GoogleLogin from 'react-google-login';
import logo from '@/assets/letter-logo.png'
import Link from 'next/link'
import Image from 'next/image';
import styles from '@/styles/pages/signin.module.css';
import { AuthContext } from "@/contexts/AuthContext";

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext)

    const handleSignIn = async e => {
        e.preventDefault();
        try {
            await signIn({email, password, google: false});
        } catch (error) {
            Swal.fire(SwalError(error.message, 'Confirmar'));
        }
    };

    const handleFailureGoogle = result => {
        console.log(result)
        Swal.fire(SwalError('Erro ao autenticar!', 'Confirmar'));
    }

    const handleLoginGoogle = async googleData => {
        const { profileObj: { email, givenName, familyName, googleId: password, imageUrl: avatar } } = googleData;
        const name = `${givenName} ${familyName}`.trim();
        try {
            await signIn({email, password, google: true, avatar, name});
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div id={styles["page-auth"]}>
            <aside className={styles.aside}>
            </aside>
            <main className={styles.main}>
                <div className={styles["main-content"]}>
                    <form onSubmit={handleSignIn}>
                        <Image className={styles.letterSignin} src={logo} alt="AnEx"></Image>
                        <div className={styles.textSignin}>
                            <strong>A plataforma de animes certa para você.</strong>
                            <p>Junte-se a nós e assista seus animes preferidos em ótima qualidade.</p>
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="informe seu endereço de e-mail"
                                className='form-control'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                placeholder="insira sua senha"
                                className='form-control'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button className={`btn btn-primary ${styles['btn-anex']}`} type="submit">Entrar</button>
                        
                        <div className={styles.separator}>
                            ou
                        </div>
                        <GoogleLogin
                            className={styles.googleButton}
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Login com Google"
                            onSuccess={handleLoginGoogle}
                            onFailure={handleFailureGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <hr />
                        <Link href={'/signup'}>
                            <a className={styles.createAccount}>
                                Criar conta grátis
                            </a>
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    );
}