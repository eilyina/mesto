export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();

    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__cross').addEventListener('click', () => {
      this.closePopup();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup();
      }
    });

  }

  updateTextSubmitButton(text){
    this._popup.querySelector('.popup__submit').textContent=text;
  }

}
