import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmPassword: '',
        cep: '',
        rua: '',
        numero: '',
        telefone: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmPassword) {
            setError("As senhas não correspondem");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: formData.nome,
                    email: formData.email,
                    senha: formData.senha,
                    cep: formData.cep,
                    rua: formData.rua,
                    numero: parseInt(formData.numero),
                    telefone: formData.telefone
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erro ao cadastrar');
            }
        } catch (error) {
            setError('Erro ao conectar com o servidor');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome Completo:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="form-control"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Digite seu email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha:</label>
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    className="form-control"
                    placeholder="Digite sua senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirme a Senha:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="cep" className="form-label">CEP:</label>
                <input
                    type="text"
                    id="cep"
                    name="cep"
                    className="form-control"
                    placeholder="Digite seu CEP"
                    value={formData.cep}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="rua" className="form-label">Rua:</label>
                <input
                    type="text"
                    id="rua"
                    name="rua"
                    className="form-control"
                    placeholder="Digite sua Rua"
                    value={formData.rua}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="numero" className="form-label">Número:</label>
                <input
                    type="text"
                    id="numero"
                    name="numero"
                    className="form-control"
                    placeholder="Digite o número"
                    value={formData.numero}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="telefone" className="form-label">Telefone:</label>
                <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    className="form-control"
                    placeholder="Digite seu telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </div>

            <p className="mt-3 text-center">
                Já tem uma conta? <Link to={'/login'}>Entrar</Link>
            </p>
        </form>
    );
}
