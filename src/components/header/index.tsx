import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    return (
        <header>
            <div className="container d-flex justify-content-between align-items-center">
                <img src={logo} alt="ReciclApp Logo" style={{ height: '50px' }} />
                <h1>ReciclApp</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/sell">Vender</Link></li>
                        <li><Link to="/inventary">Meus Móveis</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                        <li><Link to="/sobre-nos">Sobre Nós</Link></li>
                    </ul>
                </nav>

                <Dropdown align="end">
                    <Dropdown.Toggle variant="light" id="userDropdown">
                        <i className="bi bi-person-circle"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/register">Criar Conta</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/carrinho">Carrinho</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
}
