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
const photoImage = popupImage.querySelector('.popup__image');
const photoTitle = popupImage.querySelector('.popup__photo-title');


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

function switchLike(like) {
  like.classList.toggle('photo-grid__like_active');
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  personName.textContent = personNameInput.value;
  personProfessions.textContent = personProfessionsInput.value;
  closePopup(popupEditForm);
}
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.photo-grid__image');
  const cardElementTitle = cardElement.querySelector('.photo-grid__title');
  const cardElementLike = cardElement.querySelector('.photo-grid__like');
  const cardElementTrash = cardElement.querySelector('.photo-grid__trash');

  cardElementImage.src = link;
  cardElementTitle.textContent = name;
  cardElementImage.alt = name;
  cardElementLike.addEventListener('click', function (evt) { switchLike(evt.target) });
  cardElementTrash.addEventListener('click', function (evt) { evt.target.parentElement.remove(); });
  cardElementImage.addEventListener('click', function (evt) {
    photoImage.src = evt.target.src;
    photoTitle.textContent = evt.target.parentElement.querySelector('.photo-grid__title').textContent;
    photoImage.alt = evt.target.parentElement.querySelector('.photo-grid__title').textContent;
    openPopup(popupImage);
  });
  return cardElement;
}

function handleFormCreateSubmit(evt) {
  evt.preventDefault();
  photoGrid.prepend(createCard(placeName.value, placeLink.value));
  closePopup(popupCreateForm);
  createFormElement.reset();
}

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  photoGrid.append(card);
});

editFormElement.addEventListener('submit', handleEditFormSubmit);
createFormElement.addEventListener('submit', handleFormCreateSubmit);
editButton.addEventListener('click', function () {
  openPopup(popupEditForm);
  personNameInput.value = personName.textContent;
  personProfessionsInput.value = personProfessions.textContent;
  resetError(popupEditForm, validation);

});

createButton.addEventListener('click', function () {
  resetForm(popupCreateForm);
  resetError(popupCreateForm,validation);
  openPopup(popupCreateForm);
});

closeButtonEditForm.addEventListener('click', function () {
  closePopup(popupEditForm);

});

closeButtonCreateForm.addEventListener('click', function () {
  closePopup(popupCreateForm);
});

closeButtonImage.addEventListener('click', function () { closePopup(popupImage) });

popupEditForm.addEventListener('mousedown', closePopupOverlay);

popupCreateForm.addEventListener('mousedown', closePopupOverlay);

popupImage.addEventListener('mousedown', closePopupOverlay);

enableValidation(validation);


