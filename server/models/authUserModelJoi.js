const joi = require('joi');
const { keys } = require('lodash');

class AuthUserModelJOI {
  constructor(object) {
    this.firstName = object.firstName;
    this.middleName = object.middleName;
    this.lastName = object.lastName;
    this.email = object.email;
    this.phone = object.phone;
    this.password = object.password;
    this.country = object.country;
    this.city = object.city;
    this.street = object.street;
    this.houseNumber = object.houseNumber;
    this.zip = object.zip;
    this.isBiz = object.isBiz;
  }

  static #baselineValidation = {
    firstName: joi.string().required().min(3).max(20),
    middleName: joi.string().min(3).max(20),
    lastName: joi.string().required().min(3).max(20),
    email: joi.string().required().email().min(6).max(50),
    phone: joi.number().required(),
    password: joi.string().required().min(8).max(50),
    country: joi.string().min(2).max(30),
    city: joi.string().min(2).max(30),
    street: joi.string().min(2).max(30),
    houseNumber: joi.string().min(1).max(15),
    zip: joi.string().min(4).max(9),
    isBiz: joi.boolean(),
  };
  static #registerValidation = joi
    .object(AuthUserModelJOI.#baselineValidation)
    .keys({ id: joi.string().forbidden() });

  static #loginValidation = joi
    .object(AuthUserModelJOI.#baselineValidation)
    .keys({ firstName: joi.string().forbidden() })
    .keys({ lastName: joi.string().forbidden() })
    .keys({ phone: joi.string().forbidden() });

  validateRegistration() {
    const result = AuthUserModelJOI.#registerValidation.validate(this, {
      abortEarly: false,
    });

    return result.error ? result.error : null;
  }

  validateLogin() {
    const result = AuthUserModelJOI.#loginValidation.validate(this, {
      abortEarly: false,
    });

    return result.error ? result.error : null;
  }
}

module.exports = AuthUserModelJOI;
