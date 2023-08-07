const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const userRoute = require("./routes/users");
const cardRoute = require("./routes/cards");
const { auth } = require("./middleware/auth");

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use(auth);

app.use(userRoute);
app.use(cardRoute);

app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.use((err, req, res) => {
  res.status(500).send({ message: "Um erro ocorreu no servidor" });

  throw new Error(err);
});

app.listen(PORT);
