export default class Card {
  constructor(data, handleCardClick, handleTrashClick, handleLikeClick, templateSelector, currentUserId) {
    this._data = data;
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this.IdOwnerd = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;
    this._isLike = false;
  }

  _isAuthor() {
    return this.IdOwnerd == this._currentUserId;
  }

  _countLikes() {
    return this._likes.length;
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

  _enableLike = () => {
    this._isLike = false;
    this._likes.forEach(element => {
      if (element._id === this._currentUserId) {
        this._isLike = true;
      }
    });

  }

  updateLike(data) {

    this._switchLike();
    this._likes = data.likes;
    this._likeCounter.textContent = this._likes.length;
    this._enableLike();

  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._isLike);
    });

    this._buttonTrash.addEventListener('click', () => {
      this._handleTrashClick();
    })

    this._buttonOpenPopupImage.addEventListener('click', () => {
      this._handleCardClick();

    });
  }


  generateCard() {
    this._element = this._getTemplate();
    this._buttonOpenPopupImage = this._element.querySelector('.photo-grid__image');
    this._buttonLike = this._element.querySelector('.photo-grid__like');
    this._enableLike();
    if (this._isLike) {
      this._buttonLike.classList.add('photo-grid__like_active');
    }
    this._buttonTrash = this._element.querySelector('.photo-grid__trash');
    if (this._isAuthor()) {
      this._buttonTrash.hidden = false;

    }
    this._imageTitle = this._element.querySelector('.photo-grid__title');
    this._likeCounter = this._element.querySelector('.photo-grid__like-counter');
    this._setEventListeners();

    this._buttonOpenPopupImage.src = this._link;
    this._buttonOpenPopupImage.alt = this._title;
    this._imageTitle.textContent = this._title;
    this._likeCounter.textContent = this._countLikes();
    return this._element;
  }

  getCardTitle() {
    return this._title;
  }

  getCardLLink() {
    return this._link;
  }



}
