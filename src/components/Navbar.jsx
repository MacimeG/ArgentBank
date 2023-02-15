import { Link } from "react-router-dom";
import argentBankLogo from '../assets/argentBankLogo.png'


export default function Navbar(){
    return(
        //changé les balise <a> par <link>
        <nav className="main-nav">
            {/* link vers cette meme page */}
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
            {/* link vers la page de connexion */}
          <Link className="main-nav-item" to="/SignIn">
          <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
    )
}