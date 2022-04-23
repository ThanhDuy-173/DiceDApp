import {useState} from "react"
import clsx from 'clsx';
import { Link } from "react-router-dom";
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
function Navigation() {
    const [user, setUser] = useState("ThankZ");
    const handleConnect = () => {
        alert("Connect MetaMask")
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#"><Link to="/" style={{textDecoration: 'none', color: 'white'}}>Dice DApp</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title={user} id="basic-nav-dropdown" style={{marginLeft:'50px'}}>
                            <NavDropdown.Item href="/user"><Link to="/user" style={{textDecoration: 'none', color: 'black'}}>Profile</Link></NavDropdown.Item>
                            <NavDropdown.Item href="#" onClick={handleConnect}>Connect MetaMask</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" onClick={handleConnect}>Connect MetaMask</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Navigation;