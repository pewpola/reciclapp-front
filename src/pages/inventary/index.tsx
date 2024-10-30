import 'bootstrap/dist/css/bootstrap.min.css';

export default function Inventary() {

  return (
    <div>
      <header>
        <div className="container d-flex justify-content-between align-items-center">
          <img
            src="https://s3-alpha-sig.figma.com/img/73bd/7a10/59d719964bda428f35a055c64b46a338?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OKRNApSPHn9HMCP0zTvOV~Atq8wYfmDlLeK~e1h0taN1KObWAvM8dGYlQ29-Z7X-JL7dGaem0b0h-OOnrXWKTUMC7O94ptT2D7BWO2ZtFLWPKqOKuS2EE6Ep4Xiu2dgrhFoMnX5gD4M~5K9QCyqLs7GuZ7IxIGUJlYWa-vZ8QNpq-1~SKoJkyrrW0NJwayc8LNY4K~7uJz6~vQ3tgGAZ9yrAlMGrewmr7837Wr5crRSpqjct6GM3wWl6hBzOHw6~mwARLsdJlZM9H3viMEgJrd8jng8k23igDxXYdYewfQG6cWQvSPZdNpXjd7fzwmOLg6A-wCovbNs8~5B9iJ2pgw__"
            alt="ReciclApp Logo"
          />
          <h1>ReciclApp</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/vender">Vender</a></li>
              <li><a href="/meus-moveis">Meus Móveis</a></li>
              <li><a href="/contato">Contato</a></li>
              <li><a href="/sobre-nos">Sobre Nós</a></li>
            </ul>
          </nav>
          <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person-circle"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a className="dropdown-item" href="/login">Login</a></li>
              <li><a className="dropdown-item" href="/cadastro">Criar Conta</a></li>
              <li><a className="dropdown-item" href="/carrinho">Carrinho</a></li>
            </ul>
          </div>
        </div>
      </header>

      <section id="meus-moveis" className="container mt-4">
        <h2 className="text-center">Meus Móveis</h2>
        <div className="moveis-grid d-flex justify-content-around flex-wrap">
          <div className="componente-movel card m-3" style={{ width: '18rem' }}>
            <img
              src="https://p.turbosquid.com/ts-thumb/f3/6viKJR/5N/broken_table/png/1624559910/600x600/fit_q87/a1c5ecbf6213e6c8823ef766e289d869a961df19/broken_table.jpg"
              className="card-img-top"
              alt="Mesa"
            />
            <div className="card-body text-center">
              <h3 className="card-title">Mesa</h3>
              <p className="card-text">Preço: R$ 25,00</p>
              <button className="btn btn-warning m-1">Editar</button>
              <button className="btn btn-danger m-1">Excluir</button>
            </div>
          </div>

          {/* Repetir os componentes para outros móveis */}
          <div className="componente-movel card m-3" style={{ width: '18rem' }}>
            <img
              src="https://static.vecteezy.com/ti/fotos-gratis/p2/13624118-armario-quebrado-em-casa-velha-foto.jpg"
              className="card-img-top"
              alt="Armário"
            />
            <div className="card-body text-center">
              <h3 className="card-title">Armário</h3>
              <p className="card-text">Preço: R$ 40,00</p>
              <button className="btn btn-warning m-1">Editar</button>
              <button className="btn btn-danger m-1">Excluir</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; <a href="/" className="text-white">ReciclApp</a>. Todos os direitos reservados.</p>
      </footer>

      <button
        id="scrollToTopBtn"
        className="btn btn-primary"
        title="Voltar ao topo"
        style={{ display: 'none', position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        &#8679;
      </button>
    </div>
  );
};