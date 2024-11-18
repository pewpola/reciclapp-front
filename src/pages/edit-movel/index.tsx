import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovelById, updateMovel } from '../../services/authService';
import Header from '../../components/header';
import Footer from '../../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Movel {
  id?: number;
  nome: string;
  preco: string;
  descricao: string;
  estado: string;
  urlImagem: string;
}

export default function EditMovel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movel, setMovel] = useState<Movel>({
    nome: '',
    preco: '',
    descricao: '',
    estado: '',
    urlImagem: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovel = async () => {
      if (id) {
        try {
          const data = await getMovelById(Number(id));
          setMovel({
            nome: data.nome || '',
            preco: data.preco || '',
            descricao: data.descricao || '',
            estado: data.estado || '',
            urlImagem: data.urlImagem || ''
          });
        } catch (error: any) {
          setError('Erro ao buscar dados do móvel.');
        }
      }
    };
    fetchMovel();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovel({ ...movel, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (id) {
      try {
        await updateMovel(Number(id), movel);
        setSuccess('Móvel atualizado com sucesso!');
        setTimeout(() => navigate('/'), 2000);
      } catch (error: any) {
        setError('Erro ao atualizar móvel. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center">Editar Móvel</h2>
        {success && <div className="alert alert-success text-center">{success}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group mb-3">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={movel.nome}
              onChange={handleChange}
              className="form-control"
              placeholder="Digite o nome do móvel"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Preço (R$)</label>
            <input
              type="number"
              name="preco"
              value={movel.preco}
              onChange={handleChange}
              className="form-control"
              placeholder="Digite o preço"
              step="0.01"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={movel.descricao}
              onChange={handleChange}
              className="form-control"
              placeholder="Digite a descrição"
              rows={3}
              required
            />
          </div>

          {/* Campo para Estado */}
          <div className="form-group mb-3">
            <label>Estado</label>
            <input
              type="text"
              name="estado"
              value={movel.estado}
              onChange={handleChange}
              className="form-control"
              placeholder="Digite o estado (novo, usado, etc.)"
              required
            />
          </div>

          {/* Campo para URL da Imagem */}
          <div className="form-group mb-3">
            <label>URL da Imagem</label>
            <input
              type="text"
              name="urlImagem"
              value={movel.urlImagem}
              onChange={handleChange}
              className="form-control"
              placeholder="URL da imagem"
            />
          </div>

          {/* Botões de Ação */}
          <div className="text-center">
            <button type="submit" className="btn btn-warning me-2">
              Atualizar
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
