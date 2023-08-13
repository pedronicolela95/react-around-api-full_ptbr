import headerImageImg from "../images/header/header__image.svg";
import { useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();
  const currentURL = history.location.pathname;
  let contentHeader = "";

  if (currentURL === "/signin") {
    contentHeader = (
      <a className="header__message" href="/signup">
        Inscrever-se
      </a>
    );
  } else if (currentURL === "/signup") {
    contentHeader = (
      <a className="header__message" href="/signin">
        Entrar
      </a>
    );
  } else {
    contentHeader = (
      <>
        <h1 className="header__message">{props.email}</h1>
        <a className="header__signout_link" onClick={props.onSignOut}>
          Sair
        </a>
      </>
    );
  }

  return (
    <header className="header">
      <img
        className="header__image"
        alt="Around USA logo"
        src={headerImageImg}
      />
      <div className="header__info">{contentHeader}</div>
    </header>
  );
}

export default Header;
