export default class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка ${res.status}`))

  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      // .then(data => {return data})
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  updateUserInfo(userData) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  createCard(cardData) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  deleteCard(idCard) {
    return fetch(`${this.url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  updateUserAvatar(userAvatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: userAvatar
      })
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  deleteLike(idCard) {
    return fetch(`${this.url}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  putLike(idCard) {
    return fetch(`${this.url}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}
