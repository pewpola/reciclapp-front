import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome Completo:</label>
                <input type="text" id="name" name="name" className="form-control" placeholder="Digite seu nome completo" value={formData.name} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Digite seu email" value={formData.email} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha:</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Digite sua senha" value={formData.password} required />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirme a Senha:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirme sua senha" value={formData.confirmPassword} required />
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </div>
            <p className="mt-3 text-center">
                Já tem uma conta? <Link to={'/login'}>Entrar</Link>
            </p>
        </form>
    );
}
