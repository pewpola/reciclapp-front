import { useState, FormEvent, ChangeEvent } from "react";
import { createServico } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function CollectForm() {
  const [form, setForm] = useState({
    nome: "",
    cep: "",
    rua: "",
    tipo: "",
    descricao: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createServico(form);
      alert("Solicitação de coleta emitida com sucesso!");
      navigate("/coletas"); // Navegue para a página de listagem, se necessário
    } catch (err: any) {
      setError(err.message || "Erro ao emitir solicitação de coleta");
    }
  };

  return (
    <form id="form-coleta" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nome">Nome do Solicitante:</label>
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
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={form.cep}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="rua">Rua:</label>
        <input
          type="text"
          id="rua"
          name="rua"
          value={form.rua}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="tipo">Tipo de Coleta:</label>
        <input
          type="text"
          id="tipo"
          name="tipo"
          value={form.tipo}
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

      <button type="submit" className="btn btn-success">
        Emitir Solicitação de Coleta
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default CollectForm;
