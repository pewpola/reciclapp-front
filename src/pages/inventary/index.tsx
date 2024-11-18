import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovelByUser, deleteMovel } from '../../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../components/footer';
import Header from '../../components/header';

interface Movel {
  id: number;
  name: string;
  price: string;
  imgSrc: string;
}

export default function Inventary() {
  const [furnitureItems, setFurnitureItems] = useState<Movel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchMoveis = async () => {
    try {
      const moveis = await getMovelByUser();
      setFurnitureItems(moveis);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar móveis.');
    }
  };

  useEffect(() => {
    fetchMoveis();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit-movel/${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Você tem certeza que deseja excluir este móvel?');
    if (confirmed) {
      try {
        await deleteMovel(id);
        alert('Móvel excluído com sucesso!');        
        setFurnitureItems((prevItems) => prevItems.filter((item) => item.id !== id));
        
      } catch (err: any) {
        setError(err.message || 'Erro ao excluir móvel.');
        alert('Erro ao excluir o móvel. Tente novamente.');
      }
    }
  };
  

  return (
    <div>
      <Header />
      <section id="meus-moveis" className="container mt-4">
        <h2 className="text-center">Meus Móveis</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <div className="row">
          {furnitureItems.length > 0 ? (
            furnitureItems.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.imgSrc}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Preço: R$ {parseFloat(item.price).toFixed(2)}</p>
                    <div className="mt-auto">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(item.id)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Mensagem caso não haja móveis
            <p className="text-center mt-4">Nenhum móvel encontrado.</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
