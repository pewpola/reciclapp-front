import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProductImage from '../../components/product-image';
import ProductInfo from '../../components/product-info';
import { getMovelById } from '../../services/authService';
import { addItemToCarrinho } from '../../services/carrinhoService';

interface Movel {
  id: number;
  name: string;
  price: string;
  description: string;
  condition: string;
  imgSrc: string;
}

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Movel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMovelDetails = async () => {
    try {
      if (id) {
        const movelData = await getMovelById(parseInt(id));
        setProduct({
          id: movelData.id,
          name: movelData.nome,
          price: `R$ ${parseFloat(movelData.preco).toFixed(2)}`,
          description: movelData.descricao,
          condition: movelData.estado,
          imgSrc: movelData.urlImagem,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar detalhes do móvel.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (product) {
        await addItemToCarrinho(product.id, 1); // Adiciona 1 unidade
        alert('Item adicionado ao carrinho!');
        window.dispatchEvent(new Event('update-cart-count')); // Atualiza o cabeçalho
      }
    } catch (err) {
      alert('Erro ao adicionar ao carrinho.');
    }
  };

  useEffect(() => {
    fetchMovelDetails();
  }, [id]);

  return (
    <div>
      <Header />
      <section id="detalhes-produto">
        <div className="container text-center">
          <h2>Detalhes do Produto</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : product ? (
            <div className="row">
              <ProductImage src={product.imgSrc} alt={product.name} />
              <ProductInfo
                name={product.name}
                price={product.price}
                description={product.description}
                condition={product.condition}
              />
              <button
                className="btn btn-success mt-4"
                onClick={handleAddToCart}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ) : (
            <p>Produto não encontrado.</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
