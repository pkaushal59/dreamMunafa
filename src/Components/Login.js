import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase';
import './Login.css'


function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then(
                auth => {
                    if (auth)
                        history.push('/');
                }
            )
            .catch(error => console.log(error));
    }


    const registerForm = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth)
                    history.push('/')
            })
            .catch(error => console.log(error))
    }


    return (
        <div className="login">
            <Link to="/Home">
                <img src="/images/logo.png" className="login_logo" alt="amazon-logo"></img>
            </Link>
            <div className="login_container">
                <h1 className="login_header"> Sign In</h1>
                <form>
                    <h5>
                        Email
                    </h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>
                        Password
                    </h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="submit" onClick={submitForm}>Sign In</button>
                </form>
                <p>DreamMunafa privacy and terms</p>
                <button type="submit" onClick={registerForm}>Create DreamMunafa account</button>
            </div>
        </div>
    )
}

export default Login
