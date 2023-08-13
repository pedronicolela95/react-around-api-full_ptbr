import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Assinatura do contexto
  const currentUser = React.useContext(CurrentUserContext);

  // Após carregar o usuário atual da API
  // seus dados serão usados em componentes gerenciados.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Impeça que o navegador navegue até o endereço do formulário
    e.preventDefault();

    // Passe os valores dos componentes gerenciados para o manipulador externo
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="profile-form"
      title="Editar Perfil"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="name-input"
        placeholder="Nome"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error name-input-error"></span>
      <input
        className="popup__input"
        id="about-me-input"
        placeholder="Sobre mim"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error about-me-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
