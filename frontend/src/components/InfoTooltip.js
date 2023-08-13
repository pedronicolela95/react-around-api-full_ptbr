import errorSymbol from "../images/info_tool_tip/error_symbol.svg";
import successSymbol from "../images/info_tool_tip/sucess_symbol.svg";
import closeIconImg from "../images/popup/close-icon.svg";

function InfoTooltip(props) {
  const sucessMessage = props.isLogin
    ? "Vitória! Você será redirecionado!"
    : "Vitória! Você foi registrado com sucesso!";
  const message = props.isSuccess
    ? sucessMessage
    : "Ops, algo saiu deu errado! Por favor, tente novamente.";
  const symbol = props.isSuccess ? successSymbol : errorSymbol;
  const altMessage = props.isSuccess ? "Imagem de sucesso" : "Imagem de erro";

  return (
    <div
      className={
        props.isOpen
          ? `popup popup__active popup_type_${props.name}`
          : `popup popup_type_${props.name}`
      }
      id={props.name}
    >
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className="info_tool_tip">
        <button onClick={props.onClose}>
          <img
            className="popup__close-button"
            alt="Close button logo"
            src={closeIconImg}
          />
        </button>
        <div className="info_tool_tip__body">
          <img className="info_tool_tip__image" src={symbol} alt={altMessage} />
          <h1 className="info_tool_tip__message">{message}</h1>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
