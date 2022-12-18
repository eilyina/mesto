let popupEditForm = document.querySelector('.popup_type_edit-form');
let popupCreateForm = document.querySelector('.popup_type_create-form');
let editButton = document.querySelector('.profile__edit-button');
let createButton = document.querySelector('.profile__add-button');
let closeButtonEditForm = document.querySelector('.popup__cross_type_edit');
let closeButtonCreateForm = document.querySelector('.popup__cross_type_create');


let personName = document.querySelector('.profile__title');
let personProfessions = document.querySelector('.profile__subtitle');
let personNameInput = document.querySelector('.popup__input_type_name');
let personProfessionsInput = document.querySelector('.popup__input_type_professions');
let editFormElement = document.querySelector('.popup__form_type_edit');
let createFormElement = document.querySelector('.popup__form_type_create');
let placeName = createFormElement.querySelector('.popup__input_type_place-name');
let placeLink = createFormElement.querySelector('.popup__input_type_place-link');
const cardTemplate = document.querySelector('#card').content;
const photoGrid = document.querySelector('.photo-grid');

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


function handleFormSubmit(evt) {
  evt.preventDefault();
  personName.textContent = personNameInput.value;
  personProfessions.textContent = personProfessionsInput.value;
  closePopup(popupEditForm);
}



function addItem(photoGrid) {

  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector('.photo-grid__image').src = placeLink.value;
  cardElement.querySelector('.photo-grid__title').textContent =  placeName.value;
  photoGrid.append(cardElement);
  console.log(photoGrid);
  placeLink.value='';
  placeName.value='';
  return photoGrid;
}

function handleFormCreateSubmit(evt) {
  console.log('ololo');
  evt.preventDefault();
  addItem(photoGrid);
  closePopup(popupCreateForm);
}

initialCards.forEach((item) => {
  // клонируем содержимое тега template
const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);

// наполняем содержимым
cardElement.querySelector('.photo-grid__image').src = item.link;
cardElement.querySelector('.photo-grid__title').textContent = item.name;

// отображаем на странице
photoGrid.append(cardElement);
 // console.log(item.name);
  //console.log(item.link);
});
editFormElement.addEventListener('submit', handleFormSubmit);
createFormElement.addEventListener('submit', handleFormCreateSubmit);
editButton.addEventListener('click', function () {
  openPopup(popupEditForm);

});
createButton.addEventListener('click', function () {
  openPopup(popupCreateForm);

});

closeButtonEditForm.addEventListener('click', function ()
{ closePopup(popupEditForm) });
console.log(closeButtonEditForm);

closeButtonCreateForm.addEventListener('click', function () { closePopup(popupCreateForm) });









//console.log(photoGrid);
