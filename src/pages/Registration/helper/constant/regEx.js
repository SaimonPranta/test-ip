const stringValidatorRegEx = new RegExp(/^[a-z\s]{0,99}$/i);
const numberValidatorRegEx = new RegExp(/^\d+$/);
const zipCodeValidatorRegEx = new RegExp(/[0-9|A-Z]\s{0,99}$/);
const userNameValidatorRegEx = new RegExp(/^[a-z]+_[0-9]+$/);

export {
  stringValidatorRegEx,
  numberValidatorRegEx,
  zipCodeValidatorRegEx,
  userNameValidatorRegEx, 
};
