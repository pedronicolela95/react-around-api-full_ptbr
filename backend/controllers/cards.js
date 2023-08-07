const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(500).send({ message: "Ocorreu um erro no servidor" }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Os dados fornecidos são inválidos" });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
      error.statusCode = 404;
      error.name = "NotFoundError";
      throw error;
    })
    .then((card) => {
      if (card.user._id !== req.user._id) {
        const error = new Error("Usuário não possui autorização");
        error.statusCode = 403;
        error.name = "Forbidden";
        throw error;
      }
      return card.remove();
    })
    .then(() => res.send({ message: "Cartão excluído com sucesso" }))
    .catch((error) => {
      if (error.name === "CastError") {
        return res.status(400).send({ message: "Formato de ID não válido" });
      }
      if (error.name === "NotFoundError") {
        return res.status(error.statusCode).send({ message: error.message });
      }
      if (error.name === "Forbidden") {
        return res.status(error.statusCode).send({ message: error.message });
      }
      return res.status(500).send({ message: "Ocorreu um erro no servidor" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
      error.statusCode = 404;
      error.name = "NotFoundError";
      throw error;
    })
    .then((card) => res.send({ card }))
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

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remova _id do array
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ card }))
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
