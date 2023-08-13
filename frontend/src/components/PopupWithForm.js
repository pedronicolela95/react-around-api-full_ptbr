import closeIconImg from "../images/popup/close-icon.svg";

function PopupWithForm(props) {
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
      <form className="popup__form" onSubmit={props.onSubmit}>
        <button onClick={props.onClose}>
          <img
            className="popup__close-button"
            alt="Close button logo"
            src={closeIconImg}
          />
        </button>
        <div className="popup__inputs">
          <h3
            className={
              props.name === "delete-form"
                ? "popup__title popup__title_delete-form"
                : "popup__title"
            }
          >
            {props.title}
          </h3>
          {props.children}
          <button className="popup__button" type="submit">
            {props.name === "delete-form" ? "Sim" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopupWithForm;
