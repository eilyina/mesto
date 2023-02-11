import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import Card from '../script/Card.js';

import { editButton, createButton,initialCards, validation,
  selectorPopupCreateForm, selectorPopupEditForm, formCreateCard, formEditProfile,
  selectorPersonName,selectorPersonAbout, personNameInput, personProfessionsInput } from '../script/constants.js';
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

editButton.addEventListener('click', () => {
  const popupEditForm = new PopupWithForm(selectorPopupEditForm, () => {
    User.setUserInfo(personNameInput.value, personProfessionsInput.value)
  });

  personNameInput.value = User.getUserInfo().userName;
  personProfessionsInput.value = User.getUserInfo().userAbout;
  validationEditForm.resetError();
  popupEditForm.openPopup();

})

createButton.addEventListener('click', () => {
  const popupCreateForm = new PopupWithForm(selectorPopupCreateForm, (cardData) => {
    console.log(cardData);
    const newCard = createCard(cardData);
    console.log(newCard)
    cardsList.addLeftItem(newCard);
    //console.log(cardsList)
  });
  formCreateCard.reset();
  validationCreateForm.resetError();
  popupCreateForm.openPopup();

})
