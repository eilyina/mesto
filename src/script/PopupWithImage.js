const { default: Popup } = require("./Popup");
import { photoImage, photoTitle } from './constants.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  openPopup(title, link) {
    photoImage.src = link;
    photoTitle.textContent = title;
    photoImage.alt = title;
    super.openPopup();
  }
}
