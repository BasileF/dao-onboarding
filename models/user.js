const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  role: { type: String },
  status: { type: String },
  groups: [
    {
      gid: mongoose.Types.ObjectId,
      name: String,
      admin: Boolean,
    },
  ],
  nonce: {
    type: Number,
    required: true,
    default: () => Math.floor(Math.random() * 1000000),
  },
  publicAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
