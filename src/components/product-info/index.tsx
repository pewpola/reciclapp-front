import { addItemToCarrinho } from '../../services/carrinhoService';

interface ProductInfoProps {
  id: number;
  name: string;
  price: string;
  description: string;
  condition: string;
}

export default function ProductInfo({ id, name, price, description, condition }: ProductInfoProps) {
  const handleAddToCart = async () => {
    try {
      await addItemToCarrinho(id, 1);
      alert(`${name} foi adicionado ao carrinho!`);

      const event = new CustomEvent('update-cart-count');
      window.dispatchEvent(event);
    } catch (err) {
      console.error('Erro ao adicionar o item ao carrinho:', err);
      alert('Erro ao adicionar o item ao carrinho.');
    }
  };

  return (
    <div className="col-md-6 text-start">
      <h3>{name}</h3>
      <p><strong>Preço:</strong> {price}</p>
      <p><strong>Descrição:</strong> {description}</p>
      <p><strong>Condição:</strong> {condition}</p>
      <button 
        className="btn btn-secondary mt-3"
        onClick={handleAddToCart}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
