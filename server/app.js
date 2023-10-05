const express = require('express');
const { rateLimit } = require('express-rate-limit');
const morgan = require('morgan');
const config = require('config');

const app = express();
const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');
const port = 3001;
const cors = require('cors');
require('./dal/dal');

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 10000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(limiter);
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.static(config.get('uploadsFolder')));

app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);
require('./utils/initializeProject');

app.listen(port, () => console.log(`Listening to port ${port}`));
