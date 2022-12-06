let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__cross');
let personName = document.querySelector('.profile__title');
let personProfessions = document.querySelector('.profile__subtitle');
let personNameInput = document.querySelector('.popup__input_type_name');
let personProfessionsInput = document.querySelector('.popup__input_type_professions');
let formElement = document.querySelector('.popup__form');


function openPopup() {
  popup.classList.add('popup_opened');
  personNameInput.value = personName.textContent;
  personProfessionsInput.value = personProfessions.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  personName.textContent = personNameInput.value;
  personProfessions.textContent = personProfessionsInput.value;
  closePopup();
}


formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

