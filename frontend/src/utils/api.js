class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    const url = this.baseUrl + "/cards";
    const data = { headers: this.headers };
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  postCards(newPost) {
    const url = this.baseUrl + "/cards";
    const data = {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({ name: newPost.name, link: newPost.link }),
    };
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    const url = this.baseUrl + "/cards/" + cardId;
    const data = { headers: this.headers, method: "DELETE" };
    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  likeCard(cardId, isLikedByUser) {
    const method = isLikedByUser ? "DELETE" : "PUT";
    const url = this.baseUrl + "/cards/likes/" + cardId;
    const data = { headers: this.headers, method: method };

    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getProfileInfo() {
    const url = this.baseUrl + "/users/me";
    const data = { headers: this.headers };

    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfileInfo(profileInfo) {
    const url = this.baseUrl + "/users/me";
    const data = {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        name: profileInfo.name,
        about: profileInfo.about,
      }),
    };

    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfileImage(profileLink) {
    const url = this.baseUrl + "/users/me/avatar";

    const data = {
      headers: this.headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: profileLink.avatar,
      }),
    };

    return fetch(url, data).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const apiToken = "30daf07f-92e8-4bf2-9f92-48f8d54dd26d";
const groupId = "web_ptbr_cohort_03";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/" + groupId,
  headers: {
    authorization: apiToken,
    "Content-Type": "application/json",
  },
});

export default api;
