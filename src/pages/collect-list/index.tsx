import { useEffect, useState } from 'react';
import { listServicos } from '../../services/authService';
import Header from '../../components/header';
import Footer from '../../components/footer';

interface Servico {
  id: number;
  nome: string;
  cep: string;
  rua: string;
  tipo: string;
  descricao: string;
}

function CollectList() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const data = await listServicos();
        setServicos(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar os serviços');
      }
    };

    fetchServicos();
  }, []);

  return (
    <div>
        <Header/>
        <div className="container mt-5">
        <h1 className="mb-4">Coletas Emitidas</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {servicos.length === 0 ? (
            <p>Nenhuma coleta emitida até o momento.</p>
        ) : (
            <table className="table table-bordered">
            <thead>
                <tr>
                <th>Nome</th>
                <th>CEP</th>
                <th>Rua</th>
                <th>Tipo</th>
                <th>Descrição</th>
                </tr>
            </thead>
            <tbody>
                {servicos.map((servico) => (
                <tr key={servico.id}>
                    <td>{servico.nome}</td>
                    <td>{servico.cep}</td>
                    <td>{servico.rua}</td>
                    <td>{servico.tipo}</td>
                    <td>{servico.descricao}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
        <Footer/>
    </div>
  );
}

export default CollectList;
