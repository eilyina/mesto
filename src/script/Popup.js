export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    //document.body.removeEventListener('keydown', closePopupEsc);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _setEventListeners() {

    this._popup.querySelector('.popup__cross').addEventListener('click', () => {
      this.closePopup();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup();
      }
    });

    document.body.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    }
    );
  }

}
