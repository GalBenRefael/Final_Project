const express = require('express');
const _ = require('lodash');
const cards = require('../controllers/cards');

const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', requireAuth, cards.createCard);
router.get('/my-cards', requireAuth, cards.myCards);
router.get('/:id', cards.getCard);
router.patch('/:id', requireAuth, cards.editCard);
router.delete('/:id', requireAuth, cards.deleteCard);
router.get('/', cards.getAllCards);
router.get('/favs', requireAuth, cards.getUserFavoriteCards);
router.post('/:id', requireAuth, cards.setFavorite);

module.exports = router;
