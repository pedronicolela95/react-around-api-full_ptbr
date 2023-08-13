export const BASE_URL = "https://register.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 400) {
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(
        `${response.status} - um dos campos foi preenchido incorretamente`
      );
    } else {
      return Promise.reject(`500 - ocorreu um erro no servidor`);
    }
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 400) {
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(
        `${response.status} - um dos campos foi preenchido incorretamente`
      );
    } else if (response.status === 401) {
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(
        `${response.status} - o usuário com o e-mail especificado não encontrado`
      );
    } else {
      return Promise.reject(`500 - ocorreu um erro no servidor`);
    }
  });
};

export const authenticate = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 400) {
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(
        `${response.status} - token não fornecido ou fornecido em formato errado`
      );
    } else if (response.status === 401) {
      // se o servidor retornar um erro, rejeite a promessa
      return Promise.reject(
        `${response.status} - o token fornecido é inválido`
      );
    } else {
      return Promise.reject(`500 - ocorreu um erro no servidor`);
    }
  });
};
