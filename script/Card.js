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
    this._element.querySelector('.photo-grid__like').addEventListener('click', () => {
      this._switchLike();
    });
    this._element.querySelector('.photo-grid__trash').addEventListener('click', function () { this.parentElement.remove(); });
    this._element.querySelector('.photo-grid__image').addEventListener('click', function () {
      photoImage.src = this.src;
      photoTitle.textContent = this.parentElement.querySelector('.photo-grid__title').textContent;
      photoImage.alt = this.parentElement.querySelector('.photo-grid__title').textContent;
      openPopup(popupImage);
    });
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__image').alt = this._title;
    this._element.querySelector('.photo-grid__title').textContent = this._title;
    // Вернём элемент наружу
    return this._element;
  }

}
