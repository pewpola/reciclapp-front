import { useState } from 'react';

function SellForm() {
    const [form, setForm] = useState({
        nome: "",
        descricao: "",
        preco: "",
        imagem: null
    });

    return (
        <form id="form-venda">
            <label htmlFor="nome">Nome do Componente:</label>
            <input type="text" id="nome" name="nome" value={form.nome} required />

            <label htmlFor="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" value={form.descricao} required />

            <label htmlFor="preco">Preço:</label>
            <input type="number" id="preco" name="preco" value={form.preco} required />

            <label htmlFor="imagem">Imagem:</label>
            <input type="file" id="imagem" name="imagem"required />

            <button type="submit" className="btn btn-success">Vender Componente</button>
        </form>
    );
}

export default SellForm;
