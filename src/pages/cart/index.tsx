import { useEffect, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { getCarrinho, addItemToCarrinho, removeItemFromCarrinho, clearCarrinho } from '../../services/carrinhoService';
import { getToken } from '../../services/authService';

export default function Carrinho() {
  const [itens, setItens] = useState<any[]>([]);
  const [totalItens, setTotalItens] = useState(0);
  const [carrinhoId, setCarrinhoId] = useState<number>(0);

  const carregarCarrinho = async () => {
    const token = getToken();
    if (!token) {
      alert("Usuário não autenticado");
      return;
    }

    try {
      const carrinho = await getCarrinho();
      setItens(carrinho.itens || []);
      setCarrinhoId(carrinho.id || 0);

      const total = carrinho.itens.reduce(
        (acc: number, item: any) => acc + item.quantidade * parseFloat(item.movel.preco || "0"),
        0
      );
      setTotalItens(total);
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
    }
  };

  const adicionarItem = async (movelId: number, quantidade: number) => {
    try {
      await addItemToCarrinho(movelId, quantidade);
      carregarCarrinho();
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
    }
  };

  const removerItem = async (itemId: number) => {
    try {
      await removeItemFromCarrinho(carrinhoId, itemId);
      carregarCarrinho();
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  const limparCarrinho = async () => {
    try {
      await clearCarrinho(carrinhoId);
      carregarCarrinho();
    } catch (error) {
      console.error("Erro ao limpar o carrinho:", error);
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h1>Meu Carrinho</h1>
        {itens.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço Unitário</th>
                    <th>Total</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item, index) => (
                    <tr key={index}>
                      <td>{item.movel.nome}</td>
                      <td>
                        <input
                          type="number"
                          value={item.quantidade}
                          min="1"
                          className="form-control"
                          onChange={(e) =>
                            adicionarItem(item.movel.id, parseInt(e.target.value, 10) || 1)
                          }
                        />
                      </td>
                      <td>
                        R${' '}
                        {item.movel.preco && !isNaN(item.movel.preco)
                          ? parseFloat(item.movel.preco).toFixed(2)
                          : '0.00'}
                      </td>
                      <td>
                        R${' '}
                        {(item.quantidade * parseFloat(item.movel.preco || "0")).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removerItem(item.idItem)}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-end mt-3">
              <h4>Total: R$ {totalItens.toFixed(2)}</h4>
              <button className="btn btn-danger me-2" onClick={limparCarrinho}>
                Limpar Carrinho
              </button>
              <button className="btn btn-success">Finalizar Compra</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
