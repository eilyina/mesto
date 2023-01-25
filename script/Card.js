import { openPopup } from './script.js';

export default class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    const popupImage = document.querySelector('.popup_type_photo');
    const photoImage = popupImage.querySelector('.popup__image');
    const photoTitle = popupImage.querySelector('.popup__photo-title');

    this._element.querySelector('.photo-grid__like').addEventListener('click', () => {
      this._switchLike();
    });

    this._element.querySelector('.photo-grid__trash').addEventListener('click', () => { this._element.remove() })

    this._buttonOpenPopupImage.addEventListener('click', () => {
      photoImage.src = this._link;
      photoTitle.textContent = this._title;
      photoImage.alt = this._title;
      openPopup(popupImage);

    });
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._buttonOpenPopupImage = this._element.querySelector('.photo-grid__image');
    this._setEventListeners();
    // Добавим данные

    this._buttonOpenPopupImage.src = this._link;
    this._buttonOpenPopupImage.alt = this._title;
    this._element.querySelector('.photo-grid__title').textContent = this._title;
    // Вернём элемент наружу
    return this._element;
  }

}
