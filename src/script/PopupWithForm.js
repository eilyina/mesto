import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._popup.querySelector('.popup__form');
  }
  _getInputValues() {
    this._formValues = {};
    const placeName = this._element.querySelector('.popup__input_type_place-name');
    const placeLink = this._element.querySelector('.popup__input_type_place-link');
    const personNameInput = this._element.querySelector('.popup__input_type_name');
    const personProfessionsInput = this._element.querySelector('.popup__input_type_professions');

    if (this._element.classList.contains('popup__form_type_edit')) {

      this._formValues.userName = personNameInput.value;
      this._formValues.userAbout = personProfessionsInput.value;
    }

    if (this._element.classList.contains('popup__form_type_create')) {
      this._formValues.name = placeName.value;
      this._formValues.link = placeLink.value;
    }
    return this._formValues;
  }
  _setEventListeners() {
    super._setEventListeners()
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._element.reset();
      this.closePopup();
    });
  }
  addListner(){
    this._setEventListeners();
  }
  openPopup() {
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    super.closePopup();
    this._element.reset();
  }
}
