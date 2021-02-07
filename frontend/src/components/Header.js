import './Header.css'

import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap"

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>System Info</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/cpu">CPU</Link>
                    <Link className="nav-link" to="/mem">Memory & Storage</Link>
                    <Link className="nav-link" to="/proc">Processes</Link>
                    <Link className="nav-link" to="/net">Network</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Header