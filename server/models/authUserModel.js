const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },

  isBiz: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  favorites: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    default: [],
  },
  failedAttempts: {
    type: [Number],
    default: [],
  },
});

userSchema.methods.generateAuthToken = function () {
  const user = this._doc;
  delete user.password;
  const token = jwt.sign({ ...user }, config.get('jwtKey'), {
    expiresIn: '4h',
  });
  return token;
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
