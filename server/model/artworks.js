const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Artist: {
    type: String,
    required: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Medium: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Poster: {
    // we store it as a url
    type: String,
    required: true,
  },
  Reviews: [
    {
      creator: {
        type: Schema.Types.ObjectId,
        ref: "Artwork",
      },
      reviewText: String,
    },
  ],
  Likes: {
    type: Number,
  },
  artistUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Artwork = mongoose.model("Artwork", artSchema);
module.exports = Artwork;
