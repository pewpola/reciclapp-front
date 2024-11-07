import Header from '../../components/header';
import Footer from '../../components/footer';
import LoginForm from '../../components/login-form';
import ScrollToTopButton from '../../components/scroll-to-top-button';

export default function Login() {
    return (
        <div>
            <Header />
            <section id="login" className="vh-100 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body p-4">
                                    <h2 className="text-center mb-4">Login</h2>
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}
