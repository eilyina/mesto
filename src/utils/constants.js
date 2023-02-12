
const editButton = document.querySelector('.profile__edit-button');
const createButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_photo');
const photoImage = popupImage.querySelector('.popup__image');
const photoTitle = popupImage.querySelector('.popup__photo-title');
const selectorPopupCreateForm = '.popup_type_create-form';
const popupCreateForm = document.querySelector('.popup_type_create-form');
const formCreateCard = popupCreateForm.querySelector('.popup__form_type_create');
const popupProfile = document.querySelector('.popup_type_edit-form');
const formEditProfile = popupProfile.querySelector('.popup__form_type_edit');
const selectorPopupEditForm = '.popup_type_edit-form';
const selectorPersonName = '.profile__title';
const selectorPersonAbout = '.profile__subtitle';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export {initialCards,validation, editButton, createButton,
  selectorPopupCreateForm, selectorPopupEditForm, formCreateCard,
  selectorPersonName,selectorPersonAbout, photoImage, photoTitle, formEditProfile};
