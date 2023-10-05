const express = require('express');
const _ = require('lodash');
const {
  Card,
  validateCard,
  generateBizNumber,
} = require('../models/cardModel');
const auth = require('../middleware/auth');
const User = require('../models/authUserModel');
const router = express.Router();

module.exports = {
  // Create Card
  // http://localhost:3001/api/cards
  createCard: async (req, res) => {
    try {
      const { errors } = validateCard(req.body);
      if (errors) return res.status(400).send(errors);

      let card = new Card({
        bizTitle: req.body.bizTitle,
        bizSubTitle: req.body.bizSubTitle,
        bizDescription: req.body.bizDescription,
        bizPhone: req.body.bizPhone,
        bizEmail: req.body.bizEmail,
        bizWeb: req.body.bizWeb,
        bizState: req.body.bizState,
        bizCountry: req.body.bizCountry,
        bizCity: req.body.bizCity,
        bizStreet: req.body.bizStreet,
        bizHouseNo: req.body.bizHouseNo,
        bizZip: req.body.bizZip,
        bizCategory: req.body.bizCategory,
        bizImage: req.body.bizImage
          ? req.body.bizImage
          : '	https://cdn.pixabay.com/photo/2017/11/27/21/31/computer-2982270_1280.jpg',
        bizNumber: await generateBizNumber(Card),
        user_id: req.user._id,
      });

      post = await card.save();
      res.status(200).send(post);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },

  // Show Single Card
  // http://localhost:3001/api/cards/63f255b69907ef1e4ae1c8c6
  getCard: async (req, res) => {
    try {
      const card = await Card.findOne({
        _id: req.params.id,
      });
      if (!card)
        return res
          .status(404)
          .send('The card with the given ID was not found.');
      res.send(card);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Update Card
  // PUT http://localhost:3001/api/cards/63f89a92a603e58c54dd76a6
  editCard: async (req, res) => {
    try {
      const { error } = validateCard(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let card = await Card.findOneAndUpdate({ _id: req.params.id }, req.body);
      if (!card)
        return res
          .status(404)
          .send('The card with the given ID was not found.');

      card = await Card.findOne({
        _id: req.params.id,
      });
      res.send(card);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  //Delete Card
  // DELETE http://localhost:3001/api/cards/63f89a92a603e58c54dd76a6
  deleteCard: async (req, res) => {
    try {
      const card = await Card.findOneAndRemove({
        _id: req.params.id,
      });
      if (!card)
        return res
          .status(404)
          .send('The card with the given ID was not found.');
      res.send(card);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getAllCards: async (req, res) => {
    try {
      const cards = await Card.find();
      const users = await User.find();

      const likesPerId = {};

      for (const user of users) {
        for (const favorite of user.favorites) {
          if (likesPerId[favorite]) {
            likesPerId[favorite] += 1;
          } else {
            likesPerId[favorite] = 1;
          }
        }
      }

      const cardsWithLikesCount = cards.map((card) => {
        return { ...card.toObject(), likes: likesPerId[card._id] || 0 };
      });

      console.log(cardsWithLikesCount);

      res.send(cardsWithLikesCount);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  myCards: async (req, res) => {
    try {
      if (!req.user.isBiz) return res.status(401).send('Access denied.');
      const cards = await Card.find({ user_id: req.user._id });
      res.send(cards);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getUserFavoriteCards: async function (req, res, next) {
    try {
      const user = await User.findById(req.user._id).populate('favorites');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const favoriteCards = user.favorites;

      return res.status(200).json(favoriteCards);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }
  },
  setFavorite: async function (req, res, next) {
    const cardId = req.params.id;
    const userId = req.user._id;
    let status = false;
    try {
      const card = await Card.findById(cardId);
      const user = await User.findById(userId);
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }

      const cardIndex = card.favorites.indexOf(userId);
      const userIndex = user.favorites.indexOf(cardId);

      if (cardIndex === -1) {
        card.favorites.push(userId);
        status = true;
      } else {
        card.favorites.splice(cardIndex, 1);
        status = false;
      }

      if (userIndex === -1) {
        user.favorites.push(cardId);
      } else {
        user.favorites.splice(userIndex, 1);
      }

      await card.save();
      await user.save();
      const { title } = card;

      return res.status(200).json({ title, status });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }
  },
};
