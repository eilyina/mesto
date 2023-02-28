export default class UserInfo {
  constructor({ selectorUserTitle, selectorUserInfo }) {
    this._inputUserTitle = document.querySelector(selectorUserTitle);
    this._inputUserInfo = document.querySelector(selectorUserInfo);
    this._avatar = document.querySelector('.profile__image');
   // this._title=user.name;
   // this._about=user.about;
    this._userInfo = {};
  }

  getUserInfo() {
    this._userInfo.name = this._inputUserTitle.textContent;
    this._userInfo.about = this._inputUserInfo.textContent;
    return this._userInfo;
  }

  setUserInfo(userData) {
    this._inputUserTitle.textContent = userData.name;
    this._inputUserInfo.textContent = userData.about;
  }

  setUserAvatar(userData) {

   this._avatar.style.backgroundImage =  "url(" + userData.avatar + " )";
    console.log(userData.avatar)
  }


  getUserId() {
    //this._userInfo.name = this._inputUserTitle.textContent;
    //this._userInfo.about = this._inputUserInfo.textContent;
    return this._userInfo._id;
  }
}

