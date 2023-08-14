const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const { errors } = require("celebrate");
const userRoute = require("./routes/users");
const cardRoute = require("./routes/cards");
const { auth } = require("./middlewares/auth");

const NotFoundError = require("./errors/not-found-err");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.use(auth);

app.use(userRoute);
app.use(cardRoute);

app.use((req, res, next) => {
  const error = new NotFoundError("A solicitação não foi encontrada");
  next(error);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const error = { ...err };
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Um erro ocorreu no servidor";

  res.status(error.statusCode).send({ message: error.message });
});

app.listen(PORT);
