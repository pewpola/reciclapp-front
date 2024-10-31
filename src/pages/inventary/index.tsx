import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../components/footer';
import Header from '../../components/header';
import MovelGrid from '../../components/movel-grid';
import { useState } from 'react';

export default function Inventary() {
    const [furnitureItems, setFurnitureItems] = useState([
        { name: 'Mesa', price: 'R$ 25,00', imgSrc: 'https://p.turbosquid.com/ts-thumb/f3/6viKJR/5N/broken_table/png/1624559910/600x600/fit_q87/a1c5ecbf6213e6c8823ef766e289d869a961df19/broken_table.jpg' },
        { name: 'Armário', price: 'R$ 40,00', imgSrc: 'https://static.vecteezy.com/ti/fotos-gratis/p2/13624118-armario-quebrado-em-casa-velha-foto.jpg' },
    ]);

    const handleEdit = (index: number) => {
    };

    const handleDelete = (index: number) => {
    };

    return (
        <div>
            <Header />

            <section id="meus-moveis" className="container mt-4">
                <h2 className="text-center">Meus Móveis</h2>
                <MovelGrid items={furnitureItems} onEdit={handleEdit} onDelete={handleDelete} />
            </section>

            <Footer />
        </div>
    );
}
