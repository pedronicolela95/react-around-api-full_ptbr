const router = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");
const mongoose = require("mongoose");
const validator = require("validator");
const { auth } = require("../middlewares/auth");

const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const objectIdSchema = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("ID inválido");
  }
  return value;
}, "object id validation");

router.get("/cards", auth, getCards);

router.post(
  "/cards",
  auth,
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  postCard,
);

router.delete(
  "/cards/:cardId",
  auth,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      cardId: objectIdSchema.required(),
    }),
  }),
  deleteCard,
);

router.put(
  "/cards/:cardId/likes",
  auth,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      cardId: objectIdSchema.required(),
    }),
  }),
  likeCard,
);

router.delete(
  "/cards/:cardId/likes",
  auth,
  celebrate({
    [Segments.PARAMS]: Joi.object({
      cardId: objectIdSchema.required(),
    }),
  }),
  dislikeCard,
);

module.exports = router;
