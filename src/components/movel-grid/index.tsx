import MovelItem from "../movel-item";

interface Movel {
    name: string;
    price: string;
    imgSrc: string;
}

interface MovelGridPops {
    items: Movel[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}

export default function MovelGrid({ items, onEdit, onDelete }: MovelGridPops) {
    return (
        <div className="moveis-grid d-flex justify-content-around flex-wrap">
            {items.map((item, index) => (
                <MovelItem
                    key={index}
                    name={item.name}
                    price={item.price}
                    imgSrc={item.imgSrc}
                    onEdit={() => onEdit(index)}
                    onDelete={() => onDelete(index)}
                />
            ))}
        </div>
    );
}
