const express = require('express');
const multer = require('multer');
const config = require('config');

const users = require('../controllers/users');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const upload = multer({ dest: config.get('uploadsFolder') });

const _ = require('lodash');

router.post('/login', users.login);
router.post('/start-password-reset', users.startPasswordReset);
router.post('/reset-password', users.resetPassword);
router.post('/verify-token', requireAuth, users.verifyToken);
router.post('/register', upload.single('image'), users.register);
router.get('/cards', requireAuth, users.myCards);
router.get('/myuser/:id', requireAuth, users.myUser);
router.get('/', requireAuth, users.allUsers);
router.post('/favorite/:businessId', requireAuth, users.favorite);
router.delete('/:id', requireAdmin, users.delete);
router.patch('/:id', [requireAuth, upload.single('image')], users.edit);

module.exports = router;
