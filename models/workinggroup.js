const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkingGroupSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name text field is required"],
  },
  description: {
    type: String,
  },
  members: [
    {
      uid: mongoose.Types.ObjectId,
      name: String,
      dateJoined: String,
      admin: Boolean,
    },
  ],
});

const WorkingGroup = mongoose.model("workinggroups", WorkingGroupSchema);

module.exports = WorkingGroup;
