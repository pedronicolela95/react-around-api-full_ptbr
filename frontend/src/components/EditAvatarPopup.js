import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="profile-image"
      title="Alterar a foto do perfil"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className="popup__input"
        id="image-input"
        placeholder="Link da imagem"
        type="url"
        required
      />
      <span className="popup__error image-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
