
export default class FormValidator {
  //объект настроек с селекторами и классами формы;
  //элемент той формы, которая валидируется
  constructor(validation, formElement) {
    this._validation = validation;
    this._formElement = formElement;
  }
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validation.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validation.inputErrorClass);
    errorElement.classList.remove(this._validation.errorClass);
    errorElement.textContent = '';
  };
  _hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._validation.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._validation.inactiveButtonClass);
    }
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      // Передадим сообщение об ошибке вторым аргументом
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(this._validation.inputSelector));
    const buttonElement = formElement.querySelector(this._validation.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._validation.formSelector));

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      this._setEventListeners(formElement);
    });

  };

  resetError = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._validation.inputSelector));
    const buttonElement = formElement.querySelector(this._validation.submitButtonSelector);
    // очищаем ошибки валидации
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      // актуализируем состояние кнопки
    });
    this._toggleButtonState(inputList, buttonElement);
  };
}

