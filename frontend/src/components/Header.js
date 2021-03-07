import './Header.css'

import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, DropdownButton, Dropdown } from "react-bootstrap"

import appStateUtils from '../utils/appStateUtils'
import config from '../config/config'
import infoService from '../services/infoService'

const Header = (props) => {

    const handleNodeDDChange = (eventKey, event) => {
        var selectedNode = config.nodes.find(n => n.name === eventKey)
        console.log('selected node', selectedNode)
        if (selectedNode) {
            appStateUtils.setSelectedNode(
                props.appState,
                props.setAppState,
                selectedNode)
            infoService.setNode(selectedNode)
            // console.log(eventKey, event)
        }
        else {
            appStateUtils.addNotification(
                props.appState,
                props.setAppState,
                { title: 'Error', body: <p>Selected node not found!</p>, type: 'danger' })
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>System Info</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/cpu">CPU</Link>
                    <Link className="nav-link" to="/mem">Memory & Storage</Link>
                    <Link className="nav-link" to="/proc">Processes</Link>
                    <Link className="nav-link" to="/net">Network</Link>
                </Nav>
                <DropdownButton id="dropdown-basic-button"
                    className="ml-auto"
                    variant="secondary"
                    title={appStateUtils.getSelectedNode(props.appState).name}
                    onSelect={handleNodeDDChange}>
                    {config.nodes.map(n => <Dropdown.Item key={n.name} eventKey={n.name}>{n.name}</Dropdown.Item>)}
                </DropdownButton>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Header