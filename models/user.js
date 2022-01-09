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
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
