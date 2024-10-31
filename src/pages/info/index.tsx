import Header from "../../components/header";
import Footer from "../../components/footer";
import  logo  from '../../assets/logo.png';

export default function Info() {

  return (

    <div>
        <Header/>
        <section id="sobre" className="py-5">
        <div className="container">
            <h2>Sobre Nós</h2>
            <img
                src={logo}    
                alt="ReciclApp Logo"
                className="img-fluid my-4"
            />
            <p>
            Bem-vindo ao ReciclApp, uma plataforma que transforma móveis quebrados e inutilizáveis em novas oportunidades. Acreditamos que todos os móveis têm potencial para ganhar uma nova vida, e é por isso que nossa missão é promover a reutilização e reciclagem, ajudando a reduzir o impacto ambiental causado pelo descarte inadequado.
            </p>
            <p>
            No ReciclApp, conectamos pessoas que desejam se desfazer de móveis que já não servem mais com quem enxerga neles um novo propósito. Seja para reformar, revender ou reaproveitar, trabalhamos para criar um ciclo sustentável, onde cada peça tem valor.
            </p>
            <p>
            Nosso compromisso vai além das transações: queremos contribuir ativamente para a preservação do meio ambiente, inspirando um consumo mais consciente e uma economia circular. Junte-se a nós nessa jornada para um mundo mais sustentável, onde até o que parece sem utilidade pode se transformar em algo novo e especial.
            </p>
        </div>
        </section>

        <Footer/>
    </div>
  );
}