export default class UserInfo {
  constructor({ selectorUserTitle, selectorUserInfo }) {
    this._inputUserTitle = document.querySelector(selectorUserTitle);
    this._inputUserInfo = document.querySelector(selectorUserInfo);
    this._userInfo = {};
  }

  getUserInfo() {
    this._userInfo.name = this._inputUserTitle.textContent;
    this._userInfo.info = this._inputUserInfo.textContent;
    return this._userInfo;
  }

  setUserInfo(userData) {
    this._inputUserTitle.textContent = userData.name;
    this._inputUserInfo.textContent = userData.info;
  }
}
