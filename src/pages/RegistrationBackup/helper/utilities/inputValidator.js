import {
  numberValidatorRegEx,
  stringValidatorRegEx,
  userNameValidatorRegEx,
  zipCodeValidatorRegEx,
} from "../constant/regEx";

const stringValidator = (value) => {
  const result = stringValidatorRegEx.test(value);
  return result;
};
const numberValidator = (value) => {
  return numberValidatorRegEx.test(value);
};
const zipCodeValidator = (value) => {
  if (!value) {
    return true;
  }
  return zipCodeValidatorRegEx.test(value);
};

const userNameValidator = (value) => {
  return userNameValidatorRegEx.test(value);
};
const phoneNumberValidator = (value) => {
  if (!value) {
    return true;
  }
  return numberValidatorRegEx.test(value);
};

export {
  stringValidator,
  numberValidator,
  zipCodeValidator,
  userNameValidator,
  phoneNumberValidator,
};
