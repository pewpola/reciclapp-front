interface ProductInfoProps {
    name: string;
    price: string;
    description: string;
    condition: string;
    location: string;
}

export default function ProductInfo({ name, price, description, condition, location }: ProductInfoProps) {
    return (
        <div className="col-md-6 text-start">
            <h3>{name}</h3>
            <p><strong>Preço:</strong> {price}</p>
            <p><strong>Descrição:</strong> {description}</p>
            <p><strong>Condição:</strong> {condition}</p>
            <p><strong>Localização:</strong> {location}</p>
            <button className="btn btn-success">Comprar</button>
            <button className="btn btn-secondary">Adicionar ao Carrinho</button>
        </div>
    );
}
