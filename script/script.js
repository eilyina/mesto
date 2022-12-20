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
const cardTemplate = document.querySelector('#card').content;
const photoGrid = document.querySelector('.photo-grid');
const trashButtons = photoGrid.querySelectorAll('.photo-grid__trash');

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


function openPopup(popup) {
  popup.classList.add('popup_opened');
  personNameInput.value = personName.textContent;
  personProfessionsInput.value = personProfessions.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function switchLike(like) {
  like.classList.toggle('photo-grid__like_active');
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  personName.textContent = personNameInput.value;
  personProfessions.textContent = personProfessionsInput.value;
  closePopup(popupEditForm);
}



function addItem(photoGrid) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  cardElement.querySelector('.photo-grid__image').src = placeLink.value;
  cardElement.querySelector('.photo-grid__title').textContent = placeName.value;
  photoGrid.prepend(cardElement);
  placeLink.value = '';
  placeName.value = '';
  return photoGrid;
}

function handleFormCreateSubmit(evt) {
  evt.preventDefault();
  addItem(photoGrid);
  closePopup(popupCreateForm);
}

initialCards.forEach((item) => {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  cardElement.querySelector('.photo-grid__image').src = item.link;
  cardElement.querySelector('.photo-grid__title').textContent = item.name;
  photoGrid.append(cardElement);
});

editFormElement.addEventListener('submit', handleFormSubmit);
createFormElement.addEventListener('submit', handleFormCreateSubmit);
editButton.addEventListener('click', function () {
  openPopup(popupEditForm);

});
createButton.addEventListener('click', function () {
  openPopup(popupCreateForm);

});

closeButtonEditForm.addEventListener('click', function () { closePopup(popupEditForm) });
closeButtonCreateForm.addEventListener('click', function () { closePopup(popupCreateForm) });
closeButtonImage.addEventListener('click', function () { closePopup(popupImage) });


photoGrid.addEventListener('click', function (evt) {
  let target = evt.target;
  if (target.classList.contains('photo-grid__like')) {
    switchLike(target);
  }

  if (target.classList.contains('photo-grid__trash')) {
    target.parentElement.remove();
  }

  if (target.classList.contains('photo-grid__image')) {
    popupImage.querySelector('.popup__image').src = target.src;
    popupImage.querySelector('.popup__photo-title').textContent = target.parentElement.querySelector('.photo-grid__title').textContent;
    popupImage.querySelector('.popup__image').alt = target.parentElement.querySelector('.photo-grid__title').textContent;
    openPopup(popupImage);

  }
});


