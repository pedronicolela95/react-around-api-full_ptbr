import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [newCardName, setNewCardName] = React.useState("");
  const [newCardLink, setNewCardLink] = React.useState("");

  function handleNewCardNameChange(e) {
    setNewCardName(e.target.value);
  }

  function handleNewCardLinkChange(e) {
    setNewCardLink(e.target.value);
  }

  function handleSubmit(e) {
    // Impeça que o navegador navegue até o endereço do formulário
    e.preventDefault();
    // Passe os valores dos componentes gerenciados para o manipulador externo
    props.onAddNewCard({
      name: newCardName,
      link: newCardLink,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="place-form"
      title="Novo local"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="title-input"
        placeholder="Título"
        required
        minLength="2"
        maxLength="30"
        onChange={handleNewCardNameChange}
        value={newCardName}
      />
      <span className="popup__error title-input-error"></span>
      <input
        className="popup__input"
        type="url"
        id="image-link-input"
        placeholder="Link da imagem"
        onChange={handleNewCardLinkChange}
        value={newCardLink}
        required
      />
      <span className="popup__error image-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
