interface ProductCardProps {
    name: string;
    price: string;
    imgSrc: string;
}

export default function ProductCard({ name, price, imgSrc }: ProductCardProps) {
    return (
        <div className="componente-item">
            <img src={imgSrc} alt={name} style={{ width: '100%', height: 'auto' }} />
            <h3>{name}</h3>
            <p>Preço: {price}</p>
        </div>
    );
}