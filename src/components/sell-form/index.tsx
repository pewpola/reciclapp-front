import { useState, FormEvent, ChangeEvent } from 'react';
import { addMovel } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

function SellForm() {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estado: '',
    urlImagem: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addMovel(form);
      alert('Móvel adicionado com sucesso!');
      navigate('/inventary');
    } catch (err: any) {
      setError(err.message || 'Erro ao adicionar móvel');
    }
  };

  return (
    <form id="form-venda" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome do Componente:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="preco">Preço:</label>
        <input
          type="number"
          id="preco"
          name="preco"
          value={form.preco}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="estado">Estado:</label>
        <input
          type="text"
          id="estado"
          name="estado"
          value={form.estado}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="urlImagem">URL da Imagem:</label>
        <input
          type="text"
          id="urlImagem"
          name="urlImagem"
          value={form.urlImagem}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-success">
        Vender Componente
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default SellForm;
