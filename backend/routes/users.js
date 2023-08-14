const router = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");
const mongoose = require("mongoose");
const validator = require("validator");
const { auth } = require("../middlewares/auth");

const {
  getUsers,
  getUserById,
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
  avatar: Joi.string().required().custom(validateURL),
});

const objectIdSchema = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("ID inválido");
  }
  return value;
}, "object id validation");

router.get("/users", getUsers);

router.get(
  "/users/:_id",
  celebrate({ [Segments.PARAMS]: { _id: objectIdSchema.required() } }),
  getUserById,
);

router.post(
  "/sigin",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post("/sigup", celebrate({ [Segments.BODY]: userSchema }), createUsers);

router.get("/users/me", auth, getUserInfo);

router.patch(
  "/users/me",
  auth,
  celebrate({ [Segments.BODY]: userSchema }),
  updateUserProfile,
);

router.patch(
  "/users/me/avatar",
  auth,
  celebrate({ [Segments.BODY]: { avatar: userSchema.avatar } }),
  updateUserAvatar,
);

module.exports = router;
