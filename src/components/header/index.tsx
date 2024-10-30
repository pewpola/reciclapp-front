import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
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
                        <li><Link to="/vender">Vender</Link></li>
                        <li><Link to="/inventary">Meus Móveis</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                        <li><Link to="/sobre-nos">Sobre Nós</Link></li>
                    </ul>
                </nav>
                <div className="dropdown">
                    <button className="btn btn-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-circle"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><Link className="dropdown-item" to="/login">Login</Link></li>
                        <li><Link className="dropdown-item" to="/cadastro">Criar Conta</Link></li>
                        <li><Link className="dropdown-item" to="/carrinho">Carrinho</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};
