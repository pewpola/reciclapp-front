import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    senha: form.password,
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erro ao fazer login');
            }
        } catch (error) {
            setError('Erro ao conectar com o servidor');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Digite seu email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Digite sua senha"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Entrar</button>
            </div>
            <p className="mt-3 text-center">
                Não tem uma conta? <Link to={'/register'}>Cadastre-se</Link>
            </p>
        </form>
    );
}

export default LoginForm;
