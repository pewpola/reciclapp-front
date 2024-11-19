interface ProductInfoProps {
    name: string;
    price: string;
    description: string;
    condition: string;
  }
  
  export default function ProductInfo({ name, price, description, condition }: ProductInfoProps) {
    const handleAddToCart = () => {
      alert(`${name} foi adicionado ao carrinho!`);
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
  