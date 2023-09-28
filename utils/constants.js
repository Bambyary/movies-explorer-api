const regExpEngString = /[a-zA-Z0-9-._~:/?#\[\]@!\$&'()*+,;=]/;
const regExpRuString = /[а-яА-Я0-9-._~:/?#\[\]@!\$&'()*+,;=]/;
const regExpForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regExpForImgLinks = /(?:https?):\/\/(w{3}\.)?\w+([.|-]{1}\w+)*\.[0-9a-zA-Z-]+(\/[\w\-.~:/?#[\]@!$&'()*+,;=]*#?)?/;
const regExpForVideoLinks = /((http|ftp|https):\/\/)?(([\w.-]*)\.([\w]*))/;

module.exports = {
  regExpEngString,
  regExpRuString,
  regExpForPassword,
  regExpForImgLinks,
  regExpForVideoLinks,
};
