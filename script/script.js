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
let formElement = document.querySelector('.popup__form');


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
  closePopup();
}


formElement.addEventListener('submit', handleFormSubmit);
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
