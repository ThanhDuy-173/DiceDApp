import {useState, useCallback} from 'react';
import { Link } from "react-router-dom";
import {Container} from 'react-bootstrap';
import ButtonCom from '../../components/Button';
import './Home.scss'
function Home() {
    const [user, setUser] = useState({});
    const [connect, setConnect] = useState(false);
    const handleLogin = useCallback(() => {
        window.location.href='/login';
    }, [])
    const handleLocal = useCallback(() => {
        window.location.href='/play/local';
    }, [])
    const handleOnline = useCallback(() => {
        window.location.href='/play/online';
    }, [])
    const handleConnect = () => {
        alert("Connect MetaMask")
    }
    return (
        <>
            <Container>
                    {!user ? 
                    <>
                        <div style={{ marginTop: '100px', backgroundColor: 'gray'}}>
                            <h3>Please Login Account</h3>
                            <div style={{width: '50%', margin: 'auto', height: '100px'}}>
                                <ButtonCom light handleClick={handleLogin}>Login</ButtonCom>
                            </div>
                        </div>
                    </>:
                    !connect ?
                    <>
                        <div className="box-button">
                            <div className="home-btn">
                                <ButtonCom light handleClick={handleLocal}><p className="home-btn-text">Play Local</p></ButtonCom>
                            </div>
                            <div className="home-btn">
                                <ButtonCom dark handleClick={handleOnline}><p className="home-btn-text">Play Online</p></ButtonCom>
                            </div>
                        </div>
                    </>:
                    <>
                        <div style={{ marginTop: '100px', backgroundColor: 'gray'}}>
                            <h3>Please Connect MetaMask</h3>
                            <div style={{width: '50%', margin: 'auto', height: '100px'}}>
                                <ButtonCom light handleClick={handleConnect}>Connect MetaMask</ButtonCom>
                            </div>
                        </div>
                    </>
                    }
            </Container>
        </>
    )
}

export default Home