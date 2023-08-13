const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const NotAuthorizedError = require("../errors/not-authorized-err");
const ConflictError = require("../errors/conflict-error");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((error) => {
      next(error);
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Nenhum usuário encontrado com esse id");
      }
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        error = new BadRequestError("Formato de ID não válido");
      }
      next(error);
    });
};

module.exports.getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Nenhum usuário encontrado com esse id");
      }
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        error = new BadRequestError("Formato de ID não válido");
      }
      next(error);
    });
};

module.exports.createUsers = (req, res) => {
  const { email, name, about, avatar } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError("E-mail já está em uso");
      }

      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
    )
    .then((user) => res.send({ user }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        error = new BadRequestError("Os dados fornecidos são inválidos");
      }
      next(error);
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.send({ user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        error = new BadRequestError("Os dados fornecidos são inválidos");
      }
      next(error);
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
        error = new BadRequestError("Os dados fornecidos são inválidos");
      }
      next(error);
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
    .catch((error) => {
      error = new NotAuthorizedError("Autorização necessária");
      next(error);
    });
};
