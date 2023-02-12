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
    this._buttonLike.classList.toggle('photo-grid__like_active');
  }

  _deleteCard(){
    this._element.remove();
  }

  _setEventListeners() {

    this._buttonLike.addEventListener('click', () => {
      this._switchLike();
    });

    this._buttonTrash.addEventListener('click', () => { this._deleteCard() })

    this._buttonOpenPopupImage.addEventListener('click', () => {
      this._handleCardClick();

    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonOpenPopupImage = this._element.querySelector('.photo-grid__image');
    this._buttonLike = this._element.querySelector('.photo-grid__like');
    this._buttonTrash = this._element.querySelector('.photo-grid__trash');
    this._imageTitle = this._element.querySelector('.photo-grid__title');
    this._setEventListeners();

    this._buttonOpenPopupImage.src = this._link;
    this._buttonOpenPopupImage.alt = this._title;
    this._imageTitle.textContent = this._title;
    return this._element;
  }

  getCardTitle() {
    return this._title;
  }

  getCardLLink() {
    return this._link;
  }

}
