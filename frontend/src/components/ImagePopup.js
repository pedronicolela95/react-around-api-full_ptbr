import closeIconImg from "../images/popup/close-icon.svg";

function ImagePopup(props) {
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
      <div className="popup__zoom">
        <button>
          <img
            className="popup__close-button popup__close-button_zoom"
            alt="Close button logo"
            src={closeIconImg}
            onClick={props.onClose}
          />
        </button>
        <img className="popup__image" src={props.selectedCard.link} alt=" " />
        <h3 className="popup__description">{props.selectedCard.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
