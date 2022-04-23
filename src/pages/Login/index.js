import {useCallback, useState, useRef} from 'react';
import { Link } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { BsFacebook } from 'react-icons/bs';
import { GoogleLogin } from 'react-google-login';
import styles from './Login.module.scss';
import Button from '../../components/Button';
import Waiting from '../../components/Waiting';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const clientID = "614168778952-4i9u69aejf5i7qne6jcjb8aqgj9ob8n7.apps.googleusercontent.com";
    let inputRef = useRef([]);
    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };
    const handleChangePassword = e => {
        setPassword(e.target.value);
    }
    const handleLogin = useCallback(async e => {
        let u = email.trim();
        let p = password.trim();
        if(u !== "" && p !== "") {
            console.log(email, password);
            window.location.href='/';
        }
        if (u === "") {
            inputRef.current[0].focus();
        }
        if (p === "") {
            inputRef.current[1].focus();
        }
    }, [email,password, inputRef]);
    const handleRegister = useCallback(e => {
        console.log(e);
    }, []);
    const responseGoogle = async (response) => {
        const data = response.profileObj;
        const userGoogle = {
            ID: response.googleId,
            Name: data.name,
            Email: data.email,
            Password: response.googleId + data.email,
            DoB: "17/03/2000",
            Avatar: data.imageUrl,
        }
        console.log(userGoogle);
        window.location.href='/';
    }
    const responseFacebook = async (response) => {
        const userFacebook = {
            ID: response.id,
            Name: response.name,
            Email: response.email,
            Password: response.id + response.email,
            DoB: "17/03/2000",
            Avatar: response.picture.data.url,
        }
        console.log(userFacebook);
        window.location.href='/';
    }
    const style = { color: "#097DEB", fontSize: "20px", paddingTop: "3px", paddingRight: "3px"};
    if (loading) return (
        <Waiting />
    );
    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}></div>
                <div className={styles.bottom}></div>
                <div className={styles.center}>
                    <h2>Login</h2>
                    <input 
                        type="email" 
                        placeholder="email" 
                        value={email} 
                        onChange={handleChangeEmail}
                        autoFocus
                        ref={el => inputRef.current[0]= el}
                    />
                    <input
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={handleChangePassword} 
                        ref={el => inputRef.current[1]= el}
                    />
                    <div className={styles.loginOther}>
                        <GoogleLogin
                            clientId={clientID}
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <FacebookLogin
                            appId="1535653313479169"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass={styles.loginFacebook}
                            buttonText="Sign in with Facebook"
                            icon={<BsFacebook style={style} />}
                        />
                    </div>
                    <div className={styles.btn}>
                        <Button light handleClick={handleLogin}>LOGIN</Button>
                        <Link to="/register"><Button dark handleClick={handleRegister}>REGISTER</Button></Link>
                    </div>
                    <h2>&nbsp;</h2>
                    
                </div>
            </div>
        </>
    );
}

export default Login;