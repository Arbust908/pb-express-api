const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// *** Middleware
app.use(morgan('dev'));
app.use(express.json());
// >> requestDater Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// *** Router
const apiV1Route = '/api/v1';
app.use(`${apiV1Route}/tours`, tourRouter);
app.use(`${apiV1Route}/users`, userRouter);

module.exports = app;
