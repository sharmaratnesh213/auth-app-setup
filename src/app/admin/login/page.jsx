"use client"
import React, { useState } from 'react';
import styles from "./page.module.css"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import lock from "./../../../../public/assets/login/lock.png"

const Login = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });
            router.push('/admin/dashboard/form');
        } catch (error) {
            alert('login failed')
            console.error('Login failed', error.response.data);
        }
    };

    return (
        <div className={styles.container}>
            <Image
                className={styles.img}
                src={lock}
                fill
                placeholder='blur'
            />
            <div className={styles.box}>
                <div className={styles.compHead}>Company Name/Logo</div>
                <div className={styles.desc}>Please sign in with admin credentials to proceed.</div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <label className={styles.label}>Email:</label>
                        <input className={styles.input} type="email" value={email} onChange={handleEmailChange} required />
                    </div>
                    <div className={styles.row}>
                        <label className={styles.label}>Password:</label>
                        <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <button className={styles.btn} type="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
