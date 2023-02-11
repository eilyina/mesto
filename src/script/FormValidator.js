
export default class FormValidator {
  constructor(validation, formElement) {
    this._validation = validation;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._validation.inputSelector));
    this._buttonSubmit = formElement.querySelector(this._validation.submitButtonSelector);
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
  _hasInvalidInput = () => {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._buttonSubmit.classList.add(this._validation.inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this._buttonSubmit.disabled = false;
      this._buttonSubmit.classList.remove(this._validation.inactiveButtonClass);
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

  _setEventListeners = () => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from

    this._toggleButtonState();

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  resetError = () => {
    // очищаем ошибки валидации
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      // актуализируем состояние кнопки
    });
    this._toggleButtonState();
  };
}

