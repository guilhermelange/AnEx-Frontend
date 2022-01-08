import { useState } from "react";
import Swal from 'sweetalert2';
import { api } from '@/services/api';
import { SwalError, SwalSuccess } from '@/utils/swalConfigs'
import logo from '@/assets/letter-logo.png'
import Link from 'next/link'
import Router from 'next/router';
import Image from 'next/image'
import styles from '@/styles/pages/signin.module.css'

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async e => {
        e.preventDefault();
        if (!name || !email || !password) {
            Swal.fire(SwalError('Preencha todos os dados para se cadastrar', 'Confirmar'))
        } else {
            try {
                await api.post("/users", { name, email, password });
                Swal.fire(SwalSuccess('Usuário cadastrado com sucesso.'))
                Router.push('/signin');
            } catch (err) {
                Swal.fire(SwalError('Ocorreu um erro ao registrar sua conta.', 'Confirmar'))
            }
        }
    };

    return (
        <div id={styles["page-auth"]}>
            <aside className={styles.aside}>
            </aside>
            <main className={styles.main}>
                <div className={styles["main-content"]}>
                    <form onSubmit={handleSignUp}>
                        <Image className={styles.letterSignin} src={logo} alt="AnEx" />
                        <div className={styles.textSignin}>
                            <strong>A plataforma de animes certa para você.</strong>
                            <p>Junta-se a nós e assista seus animes preferidos em ótima qualidade.</p>
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Nome de usuário"
                                className="form-control"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="Endereço de e-mail"
                                className="form-control"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                placeholder="Senha"
                                className="form-control"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button className={`btn btn-primary ${styles['btn-anex']}`} type="submit">Cadastrar grátis</button>
                        <hr />
                        <Link href="/signin">
                            <a className={styles.createAccount}>Fazer login</a>
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    );
}