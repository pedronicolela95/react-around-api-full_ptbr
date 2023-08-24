const Card = require("../models/card");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");
const NotFoundError = require("../errors/not-found-err");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      next(err);
    });
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = new BadRequestError("Os dados fornecidos são inválidos");
        next(error);
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("Nenhum cartão encontrado com esse id");
    })
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError("Usuário não possui autorização");
      }
      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then(() => res.send({ message: "Cartão excluído com sucesso" }))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new BadRequestError("Formato de ID não válido");
        next(error);
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Nenhum cartão encontrado com esse id");
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new BadRequestError("Formato de ID não válido");
        next(error);
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remova _id do array
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Nenhum cartão encontrado com esse id");
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === "CastError") {
        const error = new BadRequestError("Formato de ID não válido");
        next(error);
      }
      next(err);
    });
};
