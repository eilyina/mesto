import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._popup.querySelector('.popup__form');
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action
  }

  setEventListeners() {
    super.setEventListeners()
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

}
