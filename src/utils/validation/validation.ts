// export const cityValidation = /[a-zA-Z].*[a-zA-Z]/;
// export const dateOfBirthValidation = /^\d{2}\/\d{2}\/\d{4}$/;
// export const startDateValidation = /^\d{2}\/\d{2}\/\d{4}$/;
// export const streetValidation = /[a-zA-Z]{2}/;
// export const zipCodeValidation = /^\d{5}$/;

export const Validations = {
  LastNameValidation: /[a-zA-Z].*[a-zA-Z]/,
  FirstNameValidation: /[a-zA-Z].*[a-zA-Z]/,
  NickNameValidation: /[a-zA-Z].*[a-zA-Z]/,
  EmailValidation:
    /^[a-zA-Z0-9À-ÖØ-öø-ÿ!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PasswordValidation: /^.{3,}$/,
  PasswordCreationValidation: /[a-zA-Z].*[a-zA-Z]/,
};
