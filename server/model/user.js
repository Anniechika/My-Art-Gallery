const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  isArtist: { type: Boolean, default: false },
  ownArtworks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  likedArtworks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
  likedArtists: [{ type: Schema.Types.ObjectId, ref: "User" }],
  CommissionRequest: [
    {
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      senderEmail: String,
      commisionText: String,
    },
  ],
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
