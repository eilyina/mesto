import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import Card from '../script/Card.js';

import {
  editButton, createButton, initialCards, validation,
  selectorPopupCreateForm, selectorPopupEditForm, formCreateCard, formEditProfile,
  selectorPersonName, selectorPersonAbout, personNameInput, personProfessionsInput
} from '../script/constants.js';
import '../pages/index.css';
import UserInfo from '../script/UserInfo.js';

const validationCreateForm = new FormValidator(validation, formCreateCard);
const validationEditForm = new FormValidator(validation, formEditProfile);
validationCreateForm.enableValidation();
validationEditForm.enableValidation();

const User = new UserInfo({ selecrorUserTitle: selectorPersonName, selecrorUserInfo: selectorPersonAbout });

const PopupImage = new PopupWithImage('.popup_type_photo');

function handleCardClick() {
  PopupImage.openPopup(this.getCardTitle(), this.getCardLLink());
}

function createCard(cardData) {
  const card = new Card(cardData, handleCardClick, '#card');
  const cardElem = card.generateCard();
  return cardElem;
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card);
  }
},
  '.photo-grid'
);
cardsList.renderItems();

const popupEditForm = new PopupWithForm(selectorPopupEditForm, () => {
  User.setUserInfo(personNameInput.value, personProfessionsInput.value)
});
popupEditForm.addListner();

editButton.addEventListener('click', () => {
  personNameInput.value = User.getUserInfo().userName;
  personProfessionsInput.value = User.getUserInfo().userAbout;
  validationEditForm.resetError();
  popupEditForm.openPopup();

})

const popupCreateForm = new PopupWithForm(selectorPopupCreateForm, (cardData) => {
  const newCard = createCard(cardData);
  cardsList.addLeftItem(newCard);
});
popupCreateForm.addListner();

createButton.addEventListener('click', () => {
  validationCreateForm.resetError();
  popupCreateForm.openPopup();

})
