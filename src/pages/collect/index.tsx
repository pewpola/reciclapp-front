import Header from '../../components/header';
import Footer from '../../components/footer';
import CollectForm from '../../components/collect-form';

export default function Collect() {
    return (
        <div>
            <Header />
            <section id="vender">
                <div className="container text-center">
                    <h2>Solicite sua coleta de móveis</h2>
                    <p>Tem móveis quebrados ou que não utiliza mais? Solicite a sua coleta aqui.</p>
                    <CollectForm />
                </div>
            </section>
            <Footer />
        </div>
    );
}
