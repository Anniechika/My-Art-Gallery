const express = require("express");
const router = express.Router();
const Artwork = require("../model/artworks");

// fetch the all initial artwork data from the database
router.get("/artworks", async (req, res) => {
  try {
    const artworks = await Artwork.find({});
    res.json(artworks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/api/artworks/byIds", async (req, res) => {
  try {
    const { artworkIds } = req.body; // Array of artwork IDs
    const artworks = await Artwork.find({ _id: { $in: artworkIds } });
    console.log(artworks);
    res.status(201).json(artworks);
  } catch (error) {
    res.status(500).send("Error fetching artworks");
  }
});

// Fetch single artwork from database
router.get("/artworks/:id", async (req, res) => {
  try {
    const artworkId = req.params.id;
    const artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    res.json(artwork);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/api/artworks/:artworkId/getReviews", async (req, res) => {
  try {
    const artworkId = req.params.artworkId;
    const artwork = await Artwork.findById(artworkId).populate(
      "Reviews.creator"
    );

    if (!artwork) {
      return res.status(404).send("Artwork not found");
    }

    res.json(artwork.Reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send("An error occurred while fetching the reviews");
  }
});

module.exports = router;
