const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const { errors } = require("celebrate");
const userRoute = require("./routes/users");
const cardRoute = require("./routes/cards");

const NotFoundError = require("./errors/not-found-err");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
});

const allowedCors = [
  "https://api.nicolelatripleten.mooo.com",
  "http://api.nicolelatripleten.mooo.com",
  "api.nicolelatripleten.mooo.com",
  "https://nicolelatripleten.mooo.com",
  "http://nicolelatripleten.mooo.com",
  "nicolelatripleten.mooo.com",
  "https://www.nicolelatripleten.mooo.com",
  "http://www.nicolelatripleten.mooo.com",
  "www.nicolelatripleten.mooo.com",
  "localhost:3000",
  "http://localhost:3000",
  "https://localhost:3000",
];

app.use(function (req, res, next) {
  const { origin } = req.headers; // salvando a fonte da requisição na variável 'origin'
  // verificando se a origem da requisição está mencionada na lista de permitidos
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  next();
});

app.use(bodyParser.json());

app.use(requestLogger);

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
  error.statusCode = err.statusCode || 500;
  error.message = err.message || "Um erro ocorreu no servidor";

  res.status(error.statusCode).send({ message: error.message });
});

app.listen(PORT);
