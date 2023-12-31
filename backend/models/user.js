const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const { isValidAvatarURL } = require("../utils/helpers");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "E-mail no formato errado",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorer",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: isValidAvatarURL,
    },
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Senha ou e-mail incorreto"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Senha ou e-mail incorreto"));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
