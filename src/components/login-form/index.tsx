import { useState } from 'react';

function LoginForm() {
    const [form, setForm] = useState({ email: '', password: '' });


    return (
        <form id="login-form">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Digite seu email" value={form.email} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha:</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Digite sua senha" value={form.password} required />
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">Entrar</button>
            </div>
            <p className="mt-3 text-center">
                Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
            </p>
        </form>
    );
}

export default LoginForm;
