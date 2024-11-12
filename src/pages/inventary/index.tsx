import { useEffect, useState } from 'react';
import { getMovelByUser } from '../../services/authService';
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

  const fetchMoveis = async () => {
    try {
      const moveis = await getMovelByUser();
      setFurnitureItems(moveis);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMoveis();
  }, []);

  // Funções para editar e deletar
  const handleEdit = (id: number) => {
    console.log(`Editando móvel com ID: ${id}`);
    // Aqui você pode redirecionar para uma página de edição ou abrir um modal
  };

  const handleDelete = (id: number) => {
    console.log(`Excluindo móvel com ID: ${id}`);
    // Aqui você pode chamar uma função para deletar o móvel
    const updatedItems = furnitureItems.filter(item => item.id !== id);
    setFurnitureItems(updatedItems);
  };

  return (
    <div>
      <Header />
      <section id="meus-moveis" className="container mt-4">
        <h2 className="text-center">Meus Móveis</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          {furnitureItems.length > 0 ? (
            furnitureItems.map((item) => (
              <div key={item.id} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    src={item.imgSrc}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Preço: {item.price}</p>
                    {/* Botões de Editar e Excluir */}
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-warning m-1"
                        onClick={() => handleEdit(item.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Nenhum móvel encontrado.</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
