import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProductCard from '../../components/product-card';
import { getAllMoveis } from '../../services/authService';

interface Movel {
  id: number;
  name: string;
  price: string;
  imgSrc: string;
}

export default function Home() {
  const [moveis, setMoveis] = useState<Movel[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchMoveis = async () => {
    try {
      const moveisData = await getAllMoveis();
      setMoveis(moveisData);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar móveis.');
    }
  };

  useEffect(() => {
    fetchMoveis();
  }, []);

  return (
    <div>
      <Header />
      <section id="comprar">
        <div className="container text-center">
          <h2>Móveis e componentes</h2>
          <p>Encontre aqui os móveis e os componentes que você busca.</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="componentes-grid">
            {moveis.length > 0 ? (
              moveis.map((movel) => (
                <Link key={movel.id} to={`/detail/${movel.id}`} className="product-card-link">
                  <ProductCard
                    name={movel.name}
                    price={`R$ ${parseFloat(movel.price).toFixed(2)}`}
                    imgSrc={movel.imgSrc}
                  />
                </Link>
              ))
            ) : (
              <p className="mt-4">Nenhum móvel disponível no momento.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
