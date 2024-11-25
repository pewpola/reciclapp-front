import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCarrinho } from '../../contexts/cart-context';

export default function Header() {
    const { totalItens } = useCarrinho();

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
                        <li><Link to="/collect">Serviço de Coleta</Link></li>
                        <li><Link to="/info">Sobre Nós</Link></li>
                    </ul>
                </nav>

                <div className="d-flex align-items-center">
                    <div className="position-relative me-3">
                        <Link to="/carrinho" className="text-decoration-none">
                            <i className="bi bi-cart3 fs-4"></i>
                        </Link>
                        {totalItens > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{
                                    fontSize: '0.8rem',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                {totalItens}
                            </span>
                        )}
                    </div>

                    <Dropdown align="end">
                        <Dropdown.Toggle variant="light" id="userDropdown">
                            <i className="bi bi-person-circle"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/register">Criar Conta</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/profile">Perfil</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/collect-list">Solicitações de Coleta</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}
