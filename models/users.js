const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: Date,
  isAdmin: Boolean,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
