import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovelById, updateMovel } from '../../services/authService';
import Header from '../../components/header';
import Footer from '../../components/footer';

const EditMovel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movel, setMovel] = useState<any>({
    nome: '',
    preco: '',
    estado: '',
    descricao: '',
    urlImagem: '',
  });

  const [newImage, setNewImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovel = async () => {
      try {
        if (!id) return;
        const data = await getMovelById(parseInt(id));
        setMovel(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchMovel();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovel((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('nome', movel.nome);
      formData.append('preco', movel.preco.toString());
      formData.append('estado', movel.estado);
      formData.append('descricao', movel.descricao);

      if (newImage) {
        formData.append('imagem', newImage);
      }

      await updateMovel(parseInt(id!), formData);

      navigate('/inventary');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header/>
      <div className="container mt-5">
        <h1>Editar Móvel</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              value={movel.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="preco" className="form-label">Preço</label>
            <input
              type="number"
              className="form-control"
              id="preco"
              name="preco"
              value={movel.preco}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="estado" className="form-label">Estado</label>
            <input
              type="text"
              className="form-control"
              id="estado"
              name="estado"
              value={movel.estado}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descricao" className="form-label">Descrição</label>
            <textarea
              className="form-control"
              id="descricao"
              name="descricao"
              value={movel.descricao}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="imagemAtual" className="form-label">Imagem Atual</label>
            <div>
              <img src={movel.urlImagem} alt="Imagem do móvel" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="imagem" className="form-label">Nova Imagem (opcional)</label>
            <input
              type="file"
              className="form-control"
              id="imagem"
              name="imagem"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default EditMovel;
