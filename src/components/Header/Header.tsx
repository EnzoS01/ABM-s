import { Container, Nav, Navbar } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const Header=()=>{
const Navigate =useNavigate();

    return(
    <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>MyApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link onClick={() => Navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => Navigate('/componentes')}>Componentes</Nav.Link>
            <Nav.Link onClick={() => Navigate('/administracion')}>Administracion</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
  
    </>);
}

export default Header;