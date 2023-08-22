const regExpEngString = /[a-zA-Z0-9-._~:/?#\[\]@!\$&'()*+,;=]/;
const regExpRuString = /[а-яА-Я0-9-._~:/?#\[\]@!\$&'()*+,;=]/;
const regExpForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

module.exports = {
  regExpEngString,
  regExpRuString,
  regExpForPassword,
};
