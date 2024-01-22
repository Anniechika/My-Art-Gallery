const bcrypt = require("bcryptjs");
const HttpError = require("../model/http-error");
const User = require("../model/user");
const Artwork = require("../model/artworks");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if there is duplicated users
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  // Hashing the password for security purpose
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  // After checking for duplication and hashing the password
  // We want to use the current data to create a new user and add it to the mongodb
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    ownArtworks: [],
    likedArtworks: [],
    reviews: [],
    likedArtists: [],
  });

  // Save the newly created user to the database
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  // Send the registered data back to the client
  // Exclude the sesnsitive data such that password.. Why do we need a registered user anyway?
  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
  });
};

const getUsers = async (req, res, next) => {
  let users;
};

const getUser = async (req, res, next) => {
  try {
    // Fetch the user data while excluding the password field
    const user = await User.findById(req.user.userId).select("-password");
    console.log("id is", req.user.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Since we've already excluded the password, we can directly send the user object
    console.log("return user is", user.toObject());
    res.status(201).json(user.toObject());
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user profile");
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if the user valid / is in the database
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.error(err);
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  // Validate the password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  // As the user logged in, we set up the token for this user
  // There will be only one user logged in at a time
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  console.log("Log in successful done in server");
  res.status(201).json({
    userId: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    isArtist: existingUser.isArtist,
    ownArtworks: existingUser.ownArtworks,
    likedArtworks: existingUser.likedArtworks,
    likedArtists: existingUser.likedArtists,
    CommisionRequest: existingUser.existingUser,
    token: token,
  });
};

const likeArt = async (req, res) => {
  console.log("log");
  const { artworkId } = req.body;
  const user = await User.findById(req.user.userId);
  console.log("artID", artworkId);

  try {
    // Update the artwork liks
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }
    artwork.Likes += 1;
    await artwork.save();

    if (user && !user.likedArtworks.includes(artworkId)) {
      user.likedArtworks.push(artworkId);
      await user.save();
    }
    res.status(201).json({
      message: "Artwork liked successfully",
      likes: artwork.Likes,
      likedArtworks: user.likedArtworks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error liking artwork" });
  }
};

const addReviewToArtwork = async (req, res) => {
  const { artworkId } = req.params;
  const userId = req.user.userId;
  const user = await User.findById(userId);
  const { reviewText } = req.body;

  try {
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add new review with creator information
    const newReview = { creator: userId, reviewText };
    console.log("newReview", newReview);
    artwork.Reviews.push(newReview);

    await artwork.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding review" });
  }
};

const getArtist = async (req, res) => {
  console.log("Get artist triggered in server!");
  try {
    const userId = req.params.userId;
    const artist = await User.findById(userId);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    // Assuming 'ownArtworks' field in User model is an array of ObjectIds referencing Artwork model
    const artworks = await Artwork.find({
      _id: { $in: artist.ownArtworks },
    });

    // Combining artist data with their artworks
    const artistData = {
      name: artist.name,
      email: artist.email,
      ownArtworks: artworks,
    };

    console.log("Get artist end in server!");
    res.json(artistData);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching artist data",
      error: error.message,
    });
  }
};

const followArtist = async (req, res) => {
  const { userId, artistId } = req.body; // assuming you send user and artist IDs

  console.log("ArtistID server", artistId);
  console.log("UserID server", userId);
  try {
    // Add check to prevent following oneself and re-following
    const user = await User.findById(userId);
    if (!user.likedArtists.includes(artistId) && userId !== artistId) {
      user.likedArtists.push(artistId);
      await user.save();
      console.log("User follow artist successfully in the server!");
      res.status(201).json(user);
    } else {
      res.status(400).json({
        message: "Already following this artist or invalid operation",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error following artist", error: error.message });
  }
};

const unfollowArtist = async (req, res) => {
  const { userId, artistId } = req.body;

  console.log("ArtistID unfollowed server", artistId);
  console.log("UserID  unfollowed server", userId); //undefined
  try {
    // Perform the update and retrieve the updated user document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedArtists: artistId } },
      { new: true } // Return the updated document
    ).select("-password"); // Exclude the password field for security

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error unfollowing artist", error: error.message });
  }
};

const fetchAllArtist = async (req, res) => {
  console.log("fetch all artist");
  try {
    const artists = await User.find({ isArtist: true });
    //   .select("name _id")
    //   .populate("ownArtworks"); // Populate the artworks;
    res.status(201).json(artists);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching artists", error: error.message });
  }
};

const sendCommission = async (req, res) => {
  console.log("Server sendCommision");
  try {
    const { sender, email, commissionText, artistId } = req.body;
    console.log("The sender", sender);
    console.log(email);
    console.log(commissionText);
    console.log(artistId);

    const artist = await User.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    const commissionRequest = {
      sender,
      senderEmail: email,
      commisionText: commissionText,
    };
    artist.CommissionRequest.push(commissionRequest);
    await artist.save();

    res.status(201).json({ message: "Commission request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error sending commission request",
      error: error.message,
    });
  }
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.register = register;
exports.login = login;
exports.likeArt = likeArt;
exports.followArtist = followArtist;
exports.unfollowArtist = unfollowArtist;
exports.addReviewToArtwork = addReviewToArtwork;
exports.getArtist = getArtist;
exports.fetchAllArtist = fetchAllArtist;
exports.sendCommission = sendCommission;
