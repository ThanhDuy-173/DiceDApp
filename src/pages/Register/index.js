import {useCallback, useState, useRef} from 'react';
import { Link } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { BsFacebook } from 'react-icons/bs';
import { GoogleLogin } from 'react-google-login';
import { v4 as uuidV4} from 'uuid';
import styles from './Register.module.scss';
import Button from '../../components/Button';
import Waiting from '../../components/Waiting';
function Register() {
    const clientID = "614168778952-4i9u69aejf5i7qne6jcjb8aqgj9ob8n7.apps.googleusercontent.com";
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState({
        ID: uuidV4(),
        Name: "",
        Email: "",
        Password: "",
        Avatar: "",
    });
    const [checkData, setCheckData] = useState({
        email: false,
        password: false,
        confirm: false,
        err: [
            "Check the format of your email",
            "Password should be at least 8 characters which must have digit, uppercase, and lowercase",
            "Password not match"
        ]
    });
    let inputRef = useRef([]);
    const validEmail = new RegExp( '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const validPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const handleDataUser = (e,type) => {
        if (type === "Name") {
            setNewUser({
                ...newUser,
                Name: (e.target.value).trim()
            })
        } else if (type === "Email") {
            if(validEmail.test(e.target.value)) {
                setNewUser({
                    ...newUser,
                    Email: (e.target.value).trim()
                })
                setCheckData({
                    ...checkData,
                    email: false
                })
            } else {
                setCheckData({
                    ...checkData,
                    email: true
                })
            }
        } else if (type === "Password") {
            if(validPass.test(e.target.value)){
                setNewUser({
                    ...newUser,
                    Password: (e.target.value).trim()
                })
                setCheckData({
                    ...checkData,
                    password: false
                })
            }
            else {
                setCheckData({
                    ...checkData,
                    password: true
                })
            }
        } else if (type === "DoB") {
            setNewUser({
                ...newUser,
                DoB: e.target.value
            })
        } else if (type === "Confirm") {
            if(newUser.Password === e.target.value) {
                setCheckData({
                    ...checkData,
                    confirm: false
                })
            } else {
                setCheckData({
                    ...checkData,
                    confirm: true
                })
            }
        } 
    }
    const handleLogin = useCallback(e => {
        console.log(e);
    }, []);
    const handleRegister = useCallback(async e => {
        if(newUser.Name === "") {
            inputRef.current[0].focus();
        } else if(newUser.Email === "" || !validEmail.test(newUser.Email)) {
            inputRef.current[1].focus();
        } else if(newUser.Password === "" || !validPass.test(newUser.Password)) {
            inputRef.current[2].focus();
        } else if(newUser.Password !== inputRef.current[3].value) {
            inputRef.current[3].focus();
        } else {
            console.log(newUser);
            window.location.href='/';
        }
    }, [newUser, validEmail, validPass]);
    const responseGoogle = async (response) => {
        const data = response.profileObj;
        const userGoogle = {
            ID: response.googleId,
            Name: data.name,
            Email: data.email,
            Password: response.googleId + data.email,
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
                    <h2>Register</h2>
                    <input 
                        type="text" 
                        placeholder="UserName"
                        autoFocus
                        ref={el => inputRef.current[0]= el}
                        onChange={e => handleDataUser(e, "Name")}
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        ref={el => inputRef.current[1]= el}
                        onChange={e => handleDataUser(e, "Email")}
                    />
                    {
                        (checkData.email) ?
                        <p className={styles.warning}>{checkData.err[0]}</p> :
                        <></>
                    }
                    <input 
                        type="password" 
                        placeholder="Password"
                        ref={el => inputRef.current[2]= el}
                        onChange={e => handleDataUser(e, "Password")}
                    />
                    {
                        (checkData.password) ?
                        <p className={styles.warning}>{checkData.err[1]}</p> :
                        <></>
                    }
                    <input 
                        type="password" 
                        placeholder="Confirm Password"
                        ref={el => inputRef.current[3]= el}
                        onChange={e => handleDataUser(e, "Confirm")}
                    />
                    {
                        (checkData.confirm) ?
                        <p className={styles.warning}>{checkData.err[2]}</p> :
                        <></>
                    }
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
                        <Button light handleClick={handleRegister}>REGISTER</Button>
                        <Link to="/login"><Button dark handleClick={handleLogin}>LOGIN</Button></Link>
                    </div>
                    <h2>&nbsp;</h2>
                </div>
            </div>
        </>
    );
}

export default Register;