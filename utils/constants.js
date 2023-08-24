const regExpEngString = /[a-zA-Z0-9-._~:/?#\[\]@!\$&'()*+,;=]/;
const regExpRuString = /[а-яА-Я0-9-._~:/?#\[\]@!\$&'()*+,;=]/;
const regExpForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regExpForImgLinks = /^(https?:\/\/)?(www\.)?(([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/)?([\w-]+\.(png|jpg|jpeg|gif|bmp))$/;
const regExpForVideoLinks = /((http|ftp|https):\/\/)?(([\w.-]*)\.([\w]*))/;

module.exports = {
  regExpEngString,
  regExpRuString,
  regExpForPassword,
  regExpForImgLinks,
  regExpForVideoLinks,
};
