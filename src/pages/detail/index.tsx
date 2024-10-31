import Header from '../../components/header';
import Footer from '../../components/footer';
import ProductImage from '../../components/product-image';
import ProductInfo from '../../components/product-info';

export default function Detail() {
    const product = {
        name: 'Mesa',
        price: 'R$ 25,00',
        description: 'Mesa de madeira com três pernas quebradas, das quatro. Pode ser reutilizada para quaisquer tipos de projetos ou ser consertada.',
        condition: 'Usado',
        location: 'Fortaleza, CE',
        imgSrc: 'https://p.turbosquid.com/ts-thumb/f3/6viKJR/5N/broken_table/png/1624559910/600x600/fit_q87/a1c5ecbf6213e6c8823ef766e289d869a961df19/broken_table.jpg'
    };

    return (
        <div>
            <Header />

            <section id="detalhes-produto">
                <div className="container text-center">
                    <h2>Detalhes do Produto</h2>
                    <div className="row">
                        <ProductImage src={product.imgSrc} alt={product.name} />
                        <ProductInfo
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            condition={product.condition}
                            location={product.location}
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
