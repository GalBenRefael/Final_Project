const fs = require('fs');
const bcrypt = require('bcrypt');
const config = require('config');
const joi = require('joi');
const { Card } = require('../models/cardModel');
const User = require('../models/authUserModel');
const AuthUserModelJOI = require('../models/authUserModelJoi');
const _ = require('lodash');
const path = require('path');
const { sendEmail } = require('../services/send-email');

const ONE_DAY = 1000 * 60 * 60 * 24;

const codes = {};

module.exports = {
  // REGISTER
  // POST http://localhost:3001/api/users/
  allUsers: async function (req, res, next) {
    try {
      const result = await User.find();
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'error getting users' });
    }
  },
  register: async (request, response) => {
    try {
      console.log(request.file);
      const userData = { ...request.body, isBiz: !!request.body.isBiz };
      const userModel = new AuthUserModelJOI(userData);
      const errors = userModel.validateRegistration();
      if (errors) return response.status(400).send(errors);

      let user = await User.findOne({ email: userData.email });
      if (user)
        return response
          .status(400)
          .send({ message: 'User already registered.' });

      user = new User(
        _.pick(userData, [
          'firstName',
          'lastName',
          'middleName',
          'email',
          'password',
          'phone',
          'imageUrl',
          'imageAlt',
          'state',
          'country',
          'city',
          'street',
          'houseNumber',
          'zip',
          'isBiz',
          'cards',
        ])
      );

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const userId = user._id;

      if (request.file) {
        const ext = request.file.originalname.split('.').at(-1);

        const fileName = userId + '.' + ext;
        user.imageUrl = fileName;
        fs.renameSync(
          request.file.path,
          path.join(config.get('uploadsFolder'), fileName)
        );
      }

      await user.save();

      response.status(200).send(_.pick(user, ['_id', 'firstName', 'email']));
    } catch (err) {
      response.status(500).send(err.message);
      console.log(err);
    }
  },

  verifyToken: async (request, response) => {
    try {
      const user = await User.findOne({ email: request.user.email }).select(
        '-password'
      );
      response.json(user);
    } catch (error) {
      response.status(500).send(error.message);
    }
  },

  // Login
  login: async (request, response) => {
    try {
      const userModel = new AuthUserModelJOI(request.body);
      const errors = userModel.validateLogin();
      if (errors) return response.status(400).send(errors);

      const user = await User.findOne({ email: request.body.email });
      if (!user)
        return response.status(400).json({ message: 'Invalid email.' });

      if (
        user.failedAttempts.length === 3 &&
        user.failedAttempts[0] + ONE_DAY > Date.now()
      ) {
        // Lockout
        return response
          .status(400)
          .send({ message: 'You are locked out for 24 hours' });
      }

      const password = await bcrypt.compare(
        request.body.password,
        user.password
      );
      if (!password) {
        response.status(400).send({ message: 'Invalid password.' });
        user.failedAttempts.push(Date.now());
        if (user.failedAttempts.length === 4) {
          user.failedAttempts.shift();
        }
        await user.save();
        return;
      }
      user.failedAttempts = [];
      await user.save();

      delete user.password;
      response.status(200).json({
        token: user.generateAuthToken(),
        ...user._doc,
      });
    } catch (err) {
      response.status(500).json({ message: err.message });
    }
  },

  startPasswordReset: async (request, response) => {
    const { email } = request.body;
    if (!email) {
      return response.status(400).json({ message: 'email is missing' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: 'email not found' });
    }

    // 0.3425235245234
    const code = Math.random().toString().slice(-5);
    codes[code] = email;
    sendEmail({
      email,
      subject: 'Password reset',
      text: 'You password reset code is: ' + code,
    });
    response.send({ message: 'email sent' });
  },

  resetPassword: async (request, response) => {
    const { code, newPassword } = request.body;
    const email = codes[code];
    if (!email) {
      res.json({ message: 'Incorrect code' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: 'email not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    response.json({ message: 'Password was reset successfully' });
  },

  favorite: async (req, res) => {
    const { businessId } = req.params;
    const userId = req.user._id;
    try {
      const user = await User.findById(userId);
      let type;
      const index = (user.favorites || []).indexOf(businessId);
      if (index > -1) {
        // already in favorites - remove
        user.favorites.splice(index, 1);
        type = 'Removed from';
      } else {
        // add
        user.favorites.push(businessId);
        type = 'Added to';
      }
      await user.save();

      res.status(200).send({ success: true, type });
    } catch (err) {
      console.log(err);
      res.status(401).send(err.message);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      res.status(200).send(user);
    } catch (err) {
      res.status(401).send(err.message);
    }
  },
  delete: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string().required(),
      });

      const { error, value } = scheme.validate({ _id: req.params.id });

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: 'invalid data' });
        return;
      }

      const deleted = await User.findOne({ _id: value._id });

      await User.deleteOne(value).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'error delete vacation' });
    }
  },

  edit: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string(),
        firstName: joi.string().optional().min(2).max(100),
        middleName: joi.string().optional().allow(''),
        lastName: joi.string().optional().min(2).max(100),
        phone: joi.string().optional().min(6).max(250),
        state: joi.string().optional().allow(''),
        country: joi.string().optional(),
        city: joi.string().optional(),
        street: joi.string().optional(),
        houseNumber: joi.string().optional(),
        zip: joi.string().optional().allow(''),
        isBiz: joi.boolean(),
        isAdmin: joi.boolean(),
      });

      const { error, value } = scheme.validate({
        ...req.body,
        isBiz: !!req.body.isBiz,
        isAdmin: !!req.body.isAdmin,
      });

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({
          error: 'invalid data',
          details: error.details,
        });
        return;
      }

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        value
      );
      const userId = user._id;
      if (req.file) {
        const ext = req.file.originalname.split('.').at(-1);

        const fileName = userId + '.' + ext;
        user.imageUrl = fileName;
        fs.renameSync(
          req.file.path,
          path.join(config.get('uploadsFolder'), fileName)
        );
      }

      await user.save();

      if (!user) return res.status(404).send('Given ID was not found.');

      const updated = await User.findOne({ _id: req.params.id });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'fail to update data' });
    }
  },

  // show cards under specific user
  // GET http://localhost:3001/api/users/cards
  myCards: async (req, res) => {
    try {
      const user = req.user;

      const myCards = await Card.find({ user_id: user._id });

      res.status(200).json({
        status: 'success',
        results: myCards.length,
        data: myCards,
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        status: 'fail',
        message: err.message,
      });
    }
  },

  // Show personal details
  // GET http://localhost:3001/api/users/me
  myUser: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string(),
      });

      const { error, value } = scheme.validate({ _id: req.params.id });
      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: 'invalid data' });
        return;
      }

      const result = await User.findById(value._id);

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'error getting user' });
    }
  },
};
