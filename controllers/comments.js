const commentsRouter = require("express").Router();
const Comment = require("../models/comments");

commentsRouter.get("/", (req, res, next) => {
  Comment.find({})
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => next(error));
});

commentsRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Comment.findById(id)
    .then((foundComment) => res.status(200).json(foundComment))
    .catch((error) => next(error));
});

commentsRouter.post("/", (req, res, next) => {
  const { blog_id, comment } = req.body;
  const newComment = new Comment({
    blog_id: blog_id,
    comment: comment,
    created_at: new Date(),
    blockComment: false,
  });

  newComment
    .save()
    .then((savedComment) => {
      res.status(201).json(savedComment);
    })
    .catch((error) => next(error));
});

commentsRouter.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { comment, blockComment } = req.body;
  Comment.findById(id)
    .then((foundComment) => {
      const { created_at, blog_id } = foundComment;
      const newComment = {
        blog_id: blog_id,
        comment: comment,
        created_at: created_at,
        blockComment: blockComment,
      };
      Comment.findByIdAndUpdate(id, newComment, {
        new: true,
        runValidators: true,
        context: "query",
      })
        .then((updatedComment) => {
          res.json(updatedComment);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

commentsRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Comment.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

module.exports = commentsRouter;
