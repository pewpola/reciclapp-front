import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProductCard from '../../components/product-card';
import { Link } from 'react-router-dom';

export default function Home() {
    
    return (
        <div>
            <Header/>
            <section id="comprar">
                <div className="container text-center">
                    <h2>Móveis e componentes</h2>
                    <p>Encontre aqui os móveis e os componentes que você busca.</p>
                    <div className="componentes-grid">
                        <Link to={'/detail'}>
                            <ProductCard
                                name="Mesa" 
                                price="R$ 25,00" 
                                imgSrc="https://p.turbosquid.com/ts-thumb/f3/6viKJR/5N/broken_table/png/1624559910/600x600/fit_q87/a1c5ecbf6213e6c8823ef766e289d869a961df19/broken_table.jpg"
                            />
                        </Link>
                        <ProductCard
                            name="Mesa" 
                            price="R$ 25,00" 
                            imgSrc="https://p.turbosquid.com/ts-thumb/f3/6viKJR/5N/broken_table/png/1624559910/600x600/fit_q87/a1c5ecbf6213e6c8823ef766e289d869a961df19/broken_table.jpg"
                        />
                        <ProductCard
                            name="Mesa" 
                            price="R$ 25,00" 
                            imgSrc="https://p.turbosquid.com/ts-thumb/f3/6viKJR/5N/broken_table/png/1624559910/600x600/fit_q87/a1c5ecbf6213e6c8823ef766e289d869a961df19/broken_table.jpg"
                        />
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};