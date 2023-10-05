const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');

const cardSchema = new mongoose.Schema({
  bizTitle: {
    type: String,
    required: true,
  },
  bizSubTitle: {
    type: String,
    required: true,
  },
  bizDescription: {
    type: String,
    required: true,
  },
  bizPhone: {
    type: String,
    required: true,
  },
  bizEmail: {
    type: String,
    required: true,
  },
  bizWeb: {
    type: String,
  },
  bizImage: {
    type: String,
  },
  bizImageAlt: {
    type: String,
  },
  bizState: {
    type: String,
  },
  bizCountry: {
    type: String,
    required: true,
  },
  bizCity: {
    type: String,
    required: true,
  },
  bizStreet: {
    type: String,
    required: true,
  },
  bizHouseNo: {
    type: String,
    required: true,
  },
  bizZip: {
    type: String,
    required: true,
  },
  bizCategory: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  bizNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    bizTitle: Joi.string().min(2).max(255).required(),
    bizSubTitle: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizEmail: Joi.string().email().lowercase().trim().required(),
    bizWeb: Joi.string().max(255).optional(),
    bizImage: Joi.string().min(11).max(1024),
    bizImageAlt: Joi.string().min(1).max(1024),
    bizState: Joi.string().min(2).max(400).optional(),
    bizCountry: Joi.string().min(2).max(400).required(),
    bizCity: Joi.string().min(2).max(400).required(),
    bizStreet: Joi.string().min(2).max(400).required(),
    bizCategory: Joi.string().min(2).max(400).required(),
    bizHouseNo: Joi.string().min(2).max(400),
    bizZip: Joi.string().min(2).max(19).required(),
    user_id: Joi.string().optional(),
  });

  return schema.validate(card);
}

async function generateBizNumber(Card) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let card = await Card.findOne({ bizNumber: randomNumber });
    if (!card) return String(randomNumber);
  }
}

module.exports = { Card, validateCard, generateBizNumber };
