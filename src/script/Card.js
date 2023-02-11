export default class Card {
  constructor(data, handleCardClick, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement =
      document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.photo-grid__item')
        .cloneNode(true);

    return cardElement;
  }

  _switchLike() {
    this._element.querySelector('.photo-grid__like').classList.toggle('photo-grid__like_active');
  }

  _setEventListeners() {

    this._element.querySelector('.photo-grid__like').addEventListener('click', () => {
      this._switchLike();
    });

    this._element.querySelector('.photo-grid__trash').addEventListener('click', () => { this._element.remove() })

    this._buttonOpenPopupImage.addEventListener('click', () => {
      this._handleCardClick();

    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonOpenPopupImage = this._element.querySelector('.photo-grid__image');
    this._setEventListeners();

    this._buttonOpenPopupImage.src = this._link;
    this._buttonOpenPopupImage.alt = this._title;
    this._element.querySelector('.photo-grid__title').textContent = this._title;
    return this._element;
  }

  getCardTitle() {
    return this._title;
  }

  getCardLLink() {
    return this._link;
  }

}
