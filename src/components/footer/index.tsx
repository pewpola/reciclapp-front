import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <p>&copy; <Link to="/" className="text-white">ReciclApp</Link>. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};