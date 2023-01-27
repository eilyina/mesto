import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards, validation } from './constants.js';


const popupProfile = document.querySelector('.popup_type_edit-form');
const popupCreateForm = document.querySelector('.popup_type_create-form');
const popupImage = document.querySelector('.popup_type_photo');
const editButton = document.querySelector('.profile__edit-button');
const createButton = document.querySelector('.profile__add-button');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__cross_type_edit');
const buttonCloseCreateForm = popupCreateForm.querySelector('.popup__cross_type_create');
const buttonClosePopupImage = popupImage.querySelector('.popup__cross_type_image');
const personName = document.querySelector('.profile__title');
const personProfessions = document.querySelector('.profile__subtitle');
const personNameInput = popupProfile.querySelector('.popup__input_type_name');
const personProfessionsInput = popupProfile.querySelector('.popup__input_type_professions');
const formEditProfile = popupProfile.querySelector('.popup__form_type_edit');
const formCreateCard = popupCreateForm.querySelector('.popup__form_type_create');
const placeName = formCreateCard.querySelector('.popup__input_type_place-name');
const placeLink = formCreateCard.querySelector('.popup__input_type_place-link');
const photoGrid = document.querySelector('.photo-grid');
const photoImage = popupImage.querySelector('.popup__image');
const photoTitle = popupImage.querySelector('.popup__photo-title');

const validationCreateForm = new FormValidator(validation, formCreateCard);
const validationEditForm = new FormValidator(validation, formEditProfile);
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
  closePopup(popupProfile);
}

function handleFormCreateSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeName.value,
    link: placeLink.value

  }
  photoGrid.prepend(createCard(cardData));
  closePopup(popupCreateForm);
  formCreateCard.reset();
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function createCard(cardData) {
  const card = new Card(cardData, '#card');
  const cardElem = card.generateCard();
  return cardElem;
}

formEditProfile.addEventListener('submit', handleEditFormSubmit);
formCreateCard.addEventListener('submit', handleFormCreateSubmit);
editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  personNameInput.value = personName.textContent;
  personProfessionsInput.value = personProfessions.textContent;
  validationEditForm.resetError();

});

createButton.addEventListener('click', function () {
  formCreateCard.reset();
  validationCreateForm.resetError();
  openPopup(popupCreateForm);
});

buttonClosePopupProfile.addEventListener('click', function () {
  closePopup(popupProfile);
});

buttonCloseCreateForm.addEventListener('click', function () {
  closePopup(popupCreateForm);
});

buttonClosePopupImage.addEventListener('click', function () { closePopup(popupImage) });

popupProfile.addEventListener('mousedown', closePopupOverlay);

popupCreateForm.addEventListener('mousedown', closePopupOverlay);

popupImage.addEventListener('mousedown', closePopupOverlay);



initialCards.forEach((item) => {
  photoGrid.append(createCard(item));
});

export { openPopup, popupImage, photoImage, photoTitle};

