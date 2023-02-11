export default class UserInfo {
  constructor({selecrorUserTitle, selecrorUserInfo}) {
    this._selecrorUserTitle = selecrorUserTitle;
    this._selecrorUserInfo = selecrorUserInfo;
  }

  getUserInfo() {
    this._inputUserTitle = document.querySelector(this._selecrorUserTitle);
    this._inputUserInfo = document.querySelector(this._selecrorUserInfo);
    this._userInfo = {};
    this._userInfo.userName = this._inputUserTitle.textContent;
    this._userInfo.userAbout = this._inputUserInfo.textContent;
    return this._userInfo
  }

  setUserInfo(userName,userAbout){
    this._inputUserTitle.textContent = userName;
    this._inputUserInfo.textContent = userAbout;
  }
}
