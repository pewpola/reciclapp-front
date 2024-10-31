import Header from '../../components/header';
import Footer from '../../components/footer';
import SellForm from '../../components/sell-form';

export default function Sell() {
    return (
        <div>
            <Header />
            <section id="vender">
                <div className="container text-center">
                    <h2>Venda Seus Móveis Quebrados</h2>
                    <p>Tem móveis quebrados ou que não utiliza mais? Coloque-os à venda aqui.</p>
                    <SellForm />
                </div>
            </section>
            <Footer />
        </div>
    );
}
