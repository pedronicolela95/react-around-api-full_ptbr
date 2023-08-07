const router = require("express").Router();
const { auth } = require("../middleware/auth");

const {
  getUsers,
  getUserById,
  getUserByJWT,
  createUsers,
  login,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users");

// router.get("/users", getUsers);

// router.get("/users/:_id", getUserById);

router.post("/sigin", login);

router.post("/sigup", createUsers);

router.get("/users/me", auth, getUserByJWT);

router.patch("/users/me", auth, updateUserProfile);

router.patch("/users/me/avatar", auth, updateUserAvatar);

module.exports = router;
