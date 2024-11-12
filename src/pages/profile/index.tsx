import { useEffect, useState } from 'react';
import { getProfile, logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';

interface Email {
  email: string;
  Usuario_idUsuario: number;
}

interface Telefone {
  numero: string;
  Usuario_idUsuario: number;
}

interface User {
  nome: string;
  cep: string;
  rua: string;
  numero: string;
  emails: Email[];
  telefones: Telefone[];
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (err: any) {
        setError(err.message);
        if (err.message === 'Usuário não autenticado') {
          logout();
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) {
    return <div className="alert alert-danger">Erro: {error}</div>;
  }

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
        <Header/>
        <div className="container mt-5">
        <h1>Perfil do Usuário</h1>
        <div className="card p-4">
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>CEP:</strong> {user.cep}</p>
            <p><strong>Rua:</strong> {user.rua}</p>
            <p><strong>Número:</strong> {user.numero}</p>

            <h5>Emails:</h5>
            {user.emails && user.emails.length > 0 ? (
            <ul>
                {user.emails.map((emailObj, index) => (
                <li key={index}>{emailObj.email}</li>
                ))}
            </ul>
            ) : (
            <p>Não há emails cadastrados.</p>
            )}

            <h5>Telefones:</h5>
            {user.telefones && user.telefones.length > 0 ? (
            <ul>
                {user.telefones.map((telObj, index) => (
                <li key={index}>{telObj.numero}</li>
                ))}
            </ul>
            ) : (
            <p>Não há telefones cadastrados.</p>
            )}
        </div>
        
        <button
            className="btn btn-danger mt-3"
            onClick={() => {
            logout();
            navigate('/login');
            }}
        >
            Sair
        </button>
        </div>
        <Footer/>
    </div>
  );
}
