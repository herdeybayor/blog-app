const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const blogSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  body: Object,
  slug: {
    type: String,
    required: true,
  },
  created_at: Date,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
