
interface MovelItemProps {
    name: string;
    price: string;
    imgSrc: string;
    onEdit: () => void;
    onDelete: () => void;
}

export default function MovelItem({ name, price, imgSrc, onEdit, onDelete }: MovelItemProps) {
    return (
        <div className="componente-movel card m-3" style={{ width: '18rem' }}>
            <img src={imgSrc} className="card-img-top" alt={name} />
            <div className="card-body text-center">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">Preço: {price}</p>
                <button className="btn btn-warning m-1" onClick={onEdit}>Editar</button>
                <button className="btn btn-danger m-1" onClick={onDelete}>Excluir</button>
            </div>
        </div>
    );
}
