const router = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");
const mongoose = require("mongoose");
const validator = require("validator");
const { auth } = require("../middlewares/auth");

const {
  getUserInfo,
  createUsers,
  login,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().custom(validateURL),
});

const objectIdSchema = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("ID inválido");
  }
  return value;
}, "object id validation");

router.post("/signup", celebrate({ [Segments.BODY]: userSchema }), createUsers);

router.post(
  "/signin",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

router.get("/users/me", auth, getUserInfo);

router.patch(
  "/users/me",
  auth,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    },
  }),
  updateUserProfile
);

router.patch(
  "/users/me/avatar",
  auth,
  celebrate({
    [Segments.BODY]: { avatar: Joi.string().custom(validateURL).required() },
  }),
  updateUserAvatar
);

module.exports = router;
