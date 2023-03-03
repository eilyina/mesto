import FormValidator from '../script/FormValidator.js';
import Section from '../script/Section.js';
import PopupWithImage from '../script/PopupWithImage.js';
import PopupWithForm from '../script/PopupWithForm.js';
import PopupWithConfirmation from '../script/PopupWithConfirmation.js';

import Card from '../script/Card.js';
import Api from '../script/Api.js';

import {
  editButton, createButton, validation,
  selectorPopupCreateForm, selectorPopupEditForm, formCreateCard, formEditProfile,
  selectorPersonName, selectorPersonAbout, photoImage, photoTitle, selectorPopupConfirm,
  apiConfig, editAvatarButton, selectorPopupEditAvatar, formEditAvatar
} from '../utils/constants.js';
import '../pages/index.css';
import UserInfo from '../script/UserInfo.js';

const validationCreateForm = new FormValidator(validation, formCreateCard);
const validationEditForm = new FormValidator(validation, formEditProfile);
const validationFormEditAvatarForm = new FormValidator(validation, formEditAvatar);
validationCreateForm.enableValidation();
validationEditForm.enableValidation();
validationFormEditAvatarForm.enableValidation();

const api = new Api(apiConfig);

let currentUserId = '';

const user = new UserInfo({ selectorUserTitle: selectorPersonName, selectorUserInfo: selectorPersonAbout });

function createCard(cardData) {
  const card = new Card(cardData, handleCardClick, handleTrashClick, handleLikeClick, '#card', currentUserId);
  const cardElem = card.generateCard();
  return cardElem;
}

const cardsList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card);
  }
}, '.photo-grid');

Promise.all([api.getUserInfo()
  , api.getInitialCards()
])
  .then((data) => {
    currentUserId = data[0]._id;
    user.setUserInfo(data[0]);
    user.setUserAvatar(data[0]);
    cardsList.renderItems(data[1]);
  })
  .catch((err) => console.log(`${err}`))

const popupImage = new PopupWithImage('.popup_type_photo', photoImage, photoTitle);
popupImage.setEventListeners();

function handleCardClick() {
  popupImage.openPopup(this.getCardTitle(), this.getCardLLink());
}

const popupConfirm = new PopupWithConfirmation(selectorPopupConfirm, null)
popupConfirm.setEventListeners();

function handleTrashClick() {
  const card = this;
  popupConfirm.openPopup();
  popupConfirm.setSubmitAction(() => {
    popupConfirm.updateTextSubmitButton('Сохранение...');
    api.deleteCard(card._id)
      .then(() => {
        popupConfirm.closePopup();
        card.deleteCard();
      })
      .catch(() => console.log('Произошла ошибка'))
      .finally(() => {
        popupConfirm.updateTextSubmitButton('Да');
      })
  })
}

function handleLikeClick(isActive) {
  if (isActive) {
    api.deleteLike(this._id)
      .then((data) => {
        this.updateLike(data);
      })
      .catch(() => console.log('Произошла ошибка'))
  } else {
    api.putLike(this._id)
      .then((data) => {
        this.updateLike(data);
      })
      .catch(() => console.log('Произошла ошибка'))
  }

}

const popupEditForm = new PopupWithForm(selectorPopupEditForm, (userData) => {
  popupEditForm.updateTextSubmitButton('Сохранение...');
  api.updateUserInfo(userData)
    .then(data => {
      popupEditForm.closePopup();
      user.setUserInfo(data);
    }
    )
    .catch(() => console.log('Произошла ошибка'))
    .finally(() => {
      popupEditForm.updateTextSubmitButton('Сохранить');
    }
    )
});
popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  popupEditForm.setInputValues(userInfo);
  validationEditForm.resetError();
  popupEditForm.openPopup();
})

const popupCreateForm = new PopupWithForm(selectorPopupCreateForm, (cardData) => {
  popupCreateForm.updateTextSubmitButton('Создание...');
  api.createCard(cardData)
    .then(data => {
      popupCreateForm.closePopup();
      const newCard = createCard(data);
      cardsList.addLeftItem(newCard);
    }
    )
    .catch(() => console.log('Произошла ошибка'))
    .finally(() => {
      popupCreateForm.updateTextSubmitButton('Создать');
    })
});
popupCreateForm.setEventListeners();

createButton.addEventListener('click', () => {
  validationCreateForm.resetError();
  popupCreateForm.openPopup();

})

const popupEditAvatar = new PopupWithForm(selectorPopupEditAvatar, (userData) => {
  popupEditAvatar.updateTextSubmitButton('Сохранение...');
  api.updateUserAvatar(userData.avatar)
    .then(data => {
      popupEditAvatar.closePopup();
      user.setUserAvatar(data);
    }
    )
    .catch(() => console.log('Произошла ошибка'))
    .finally(() => {
      popupEditAvatar.updateTextSubmitButton('Сохранить');
    })

});
popupEditAvatar.setEventListeners();

editAvatarButton.addEventListener('click', () => {
  popupEditAvatar.openPopup();
})
