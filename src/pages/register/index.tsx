import Header from "../../components/header";
import Footer from "../../components/footer";
import RegisterForm from "../../components/register-form";

export default function Register() {
    return (
        <div className="vh-100 d-flex flex-column">
            <Header />
            <section id="register" className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body p-4">
                                    <h2 className="text-center mb-4">Cadastro</h2>
                                    <RegisterForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
