const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const userRoute = require("./routes/users");
const cardRoute = require("./routes/cards");
const { auth } = require("./middleware/auth");

const NotFoundError = require("./errors/not-found-err");

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use(auth);

app.use(userRoute);
app.use(cardRoute);

app.use((req, res, next) => {
  const error = new NotFoundError("A solicitação não foi encontrada");
  next(error);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Um erro ocorreu no servidor";

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT);
