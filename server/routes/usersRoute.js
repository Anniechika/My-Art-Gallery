const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

const usersController = require("../controllers/users-controller");
const User = require("../model/user");

router.get("/", usersController.getUsers);

router.get("/api/user/profile", authenticateToken, usersController.getUser);
router.get("/api/artists", usersController.fetchAllArtist);
router.post("/register", usersController.register);
router.get("/api/users/:userId", usersController.getArtist);

router.post("/login", usersController.login);

// Return the updated user information back to the server
router.post("/api/like-artwork", authenticateToken, usersController.likeArt);
router.post("/api/send-commission", authenticateToken, usersController.sendCommission);
router.post(
  "/api/users/follow",
  authenticateToken,
  usersController.followArtist
);

router.post(
  "/api/users/unfollow",
  authenticateToken,
  usersController.unfollowArtist
);
router.post(
  "/api/artworks/:artworkId/review",
  authenticateToken,
  usersController.addReviewToArtwork
);

router.post("/followArtist", usersController.followArtist);

module.exports = router;
