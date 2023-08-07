const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() =>
      res.status(500).send({ message: "Ocorreu um erro no servidor" })
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        const error = new Error("Nenhum cartão encontrado com esse id");
        error.statusCode = 404;
        error.name = "NotFoundError";
        throw error;
      }
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return res.status(400).send({ message: "Formato de ID não válido" });
      }
      if (error.name === "NotFoundError") {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const error = new Error("Nenhum cartão encontrado com esse id");
        error.statusCode = 404;
        error.name = "NotFoundError";
        throw error;
      }
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return res.status(400).send({ message: "Formato de ID não válido" });
      }
      if (error.name === "NotFoundError") {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.createUsers = (req, res) => {
  const { email, name, about, avatar } = req.body;

  bcrypt.hash(req.body.password, 10).then((hash) =>
    User.create({ email, password: hash, name, about, avatar })
      .then((user) => res.send({ user }))
      .catch((error) => {
        if (error.name === "ValidationError") {
          return res
            .status(400)
            .send({ message: "Os dados fornecidos são inválidos" });
        }
        return res.status(500).send({ message: "Ocorreu um erro no servidor" });
      })
  );
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Os dados fornecidos são inválidos" });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Os dados fornecidos são inválidos" });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, "super-strong-secret", {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
