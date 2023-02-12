import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import Card from '../script/Card.js';

import {
  editButton, createButton, initialCards, validation,
  selectorPopupCreateForm, selectorPopupEditForm, formCreateCard, formEditProfile,
  selectorPersonName, selectorPersonAbout, photoImage, photoTitle
} from '../utils/constants.js';
import '../pages/index.css';
import UserInfo from '../script/UserInfo.js';

const validationCreateForm = new FormValidator(validation, formCreateCard);
const validationEditForm = new FormValidator(validation, formEditProfile);
validationCreateForm.enableValidation();
validationEditForm.enableValidation();

const user = new UserInfo({ selectorUserTitle: selectorPersonName, selectorUserInfo: selectorPersonAbout });

const popupImage = new PopupWithImage('.popup_type_photo', photoImage, photoTitle);
popupImage.setEventListeners();

function handleCardClick() {
  popupImage.openPopup(this.getCardTitle(), this.getCardLLink());
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

const popupEditForm = new PopupWithForm(selectorPopupEditForm, (userData) => {
  user.setUserInfo(userData);
});

popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  popupEditForm.setInputValues(userInfo);
  validationEditForm.resetError();
  popupEditForm.openPopup();

})

const popupCreateForm = new PopupWithForm(selectorPopupCreateForm, (cardData) => {
  const newCard = createCard(cardData);
  cardsList.addLeftItem(newCard);
});
popupCreateForm.setEventListeners();

createButton.addEventListener('click', () => {
  validationCreateForm.resetError();
  popupCreateForm.openPopup();

})
