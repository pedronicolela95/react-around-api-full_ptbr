import React, { useState } from "react";
import InfoTooltip from "./InfoTooltip.js";
import { withRouter, useHistory } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props
      .onLogin(email, password)
      .then((res) => {
        setEmail("");
        setPassword("");
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
      })
      .finally(() => {
        props.handleAuthResponse();
      });
  };

  const handleClosePopup = () => {
    props.closeAllPopups();
    if (isSuccess) {
      history.push("/");
    }
  };

  return (
    <>
      <InfoTooltip
        isSuccess={isSuccess}
        isOpen={props.isOpen}
        name="login"
        isLogin={true}
        onClose={handleClosePopup}
      />
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__header">Entrar</h1>
        <input
          className="login__input"
          id="email"
          placeholder="E-mail"
          value={email}
          required
          onChange={handleEmailChange}
        />
        <input
          className="login__input"
          id="password"
          placeholder="Senha"
          type="password"
          value={password}
          required
          onChange={handlePasswordChange}
        />
        <button className="login__button" type="submit">
          Entrar
        </button>
        <a className="login__subtitle" href="/signup">
          Ainda não é membro? Inscreva-se aqui!
        </a>
      </form>
    </>
  );
}
export default withRouter(Login);
