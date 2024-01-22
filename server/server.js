const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Import the Artwork model
const Artwork = require("./model/artworks");
const User = require("./model/user");

// Import routes
const artworksRouter = require("./routes/artworksRoute");
const usersRouter = require("./routes/usersRoute");

// Use all the routes defined
app.use(cors());
app.use(express.json());
app.use("/", artworksRouter);
app.use("/", usersRouter);
console.log("JWT Secret:", process.env.JWT_SECRET);

// Function for parsing the data into json
const loadArtworkData = () => {
  const jsonData = fs.readFileSync(
    path.join(__dirname, "data", "gallery.json"),
    "utf8"
  );
  return JSON.parse(jsonData);
};

const getArtworkData = () => {
  try {
    return loadArtworkData(); // Make sure to return the data
  } catch (error) {
    console.log("Error:", error);
    return []; // Return an empty array in case of an error
  }
};

const insertArtworkData = async () => {
  try {
    // Clean existing data
    await Artwork.deleteMany({});
    await User.deleteMany({});

    const loadedArtworks = getArtworkData();
    const artistMap = new Map();

    for (const artworkData of loadedArtworks) {
      let artistUser;

      // Check if artist user exists, if not create them
      if (!artistMap.has(artworkData.Artist)) {
        const hashedPassword = await bcrypt.hash("defaultPassword", 12); // Encrypting the password

        artistUser = new User({
          name: artworkData.Artist,
          email: `${artworkData.Artist.replace(
            /\s+/g,
            ""
          ).toLowerCase()}@example.com`, // Generating a dummy email
          password: hashedPassword, // Using encrypted password
          isArtist: true,
        });

        await artistUser.save();
        artistMap.set(artworkData.Artist, artistUser);
      } else {
        artistUser = artistMap.get(artworkData.Artist);
      }

      // Create artwork with artistUserId field
      let artwork = new Artwork({
        ...artworkData,
        artistUserId: artistUser._id, // Add the artist's user ID
      });
      await artwork.save();

      // Link artwork to the artist
      artistUser.ownArtworks.push(artwork);
      await artistUser.save();

      console.log(`Inserted artwork: ${artworkData.Title}`);
      console.log(`Inserted User: ${artistUser.name}`);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const connectToDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://anniechika1:zh2131AA@cluster0.7qxrjz8.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      // if connection success, we start the backend
      console.log("Connection success!");
      app.listen(5000);
      // replaceArtworkData();
      // insertArtworkData();
    })
    .catch((err) => {
      console.log(err);
    });
};

connectToDatabase();
