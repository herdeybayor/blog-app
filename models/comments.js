const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const commentSchema = new Schema({
  blog_id: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: Date,
  blockComment: Boolean,
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Comment", commentSchema);
