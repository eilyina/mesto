import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards, validation } from './constants.js';

const popupEditForm = document.querySelector('.popup_type_edit-form');
const popupCreateForm = document.querySelector('.popup_type_create-form');
const popupImage = document.querySelector('.popup_type_photo');
const editButton = document.querySelector('.profile__edit-button');
const createButton = document.querySelector('.profile__add-button');
const closeButtonEditForm = popupEditForm.querySelector('.popup__cross_type_edit');
const closeButtonCreateForm = popupCreateForm.querySelector('.popup__cross_type_create');
const closeButtonImage = popupImage.querySelector('.popup__cross_type_image');
const personName = document.querySelector('.profile__title');
const personProfessions = document.querySelector('.profile__subtitle');
const personNameInput = popupEditForm.querySelector('.popup__input_type_name');
const personProfessionsInput = popupEditForm.querySelector('.popup__input_type_professions');
const editFormElement = popupEditForm.querySelector('.popup__form_type_edit');
const createFormElement = popupCreateForm.querySelector('.popup__form_type_create');
const placeName = createFormElement.querySelector('.popup__input_type_place-name');
const placeLink = createFormElement.querySelector('.popup__input_type_place-link');
const photoGrid = document.querySelector('.photo-grid');

const validationCreateForm = new FormValidator(validation, createFormElement);
const validationEditForm = new FormValidator(validation, editFormElement);
validationCreateForm.enableValidation();
validationEditForm.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.body.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', closePopupEsc);
}

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  personName.textContent = personNameInput.value;
  personProfessions.textContent = personProfessionsInput.value;
  closePopup(popupEditForm);
}

function handleFormCreateSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeName.value,
    link: placeLink.value

  }
  const card = new Card(cardData, '#card');
  const cardElem = card.generateCard();
  photoGrid.prepend(cardElem);
  closePopup(popupCreateForm);
  createFormElement.reset();
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

editFormElement.addEventListener('submit', handleEditFormSubmit);
createFormElement.addEventListener('submit', handleFormCreateSubmit);
editButton.addEventListener('click', function () {
  openPopup(popupEditForm);
  personNameInput.value = personName.textContent;
  personProfessionsInput.value = personProfessions.textContent;
  validationEditForm.resetError(popupEditForm);

});

createButton.addEventListener('click', function () {
  createFormElement.reset();
  validationCreateForm.resetError(createFormElement);
  openPopup(popupCreateForm);
});

closeButtonEditForm.addEventListener('click', function () {
  closePopup(popupEditForm);
});

closeButtonCreateForm.addEventListener('click', function () {
  closePopup(popupCreateForm);
});

closeButtonImage.addEventListener('click', function () { closePopup(popupImage) });

popupEditForm.addEventListener('mousedown', closePopupOverlay);

popupCreateForm.addEventListener('mousedown', closePopupOverlay);

popupImage.addEventListener('mousedown', closePopupOverlay);



initialCards.forEach((item) => {
  const card = new Card(item, '#card');
  const cardElem = card.generateCard();
  photoGrid.append(cardElem);
});

