const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const _ = require("lodash");

blogsRouter.get("/", (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.status(200).json(blogs);
    })
    .catch((error) => next(error));
});

blogsRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((foundBlog) => res.status(200).json(foundBlog))
    .catch((error) => next(error));
});

blogsRouter.post("/", (req, res, next) => {
  const { user_id, title, body } = req.body;
  const newBlog = new Blog({
    user_id: user_id,
    title: title,
    body: body,
    slug: _.kebabCase(title),
    created_at: new Date(),
  });

  newBlog
    .save()
    .then((savedBlog) => {
      res.status(201).json(savedBlog);
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  Blog.findById(id)
    .then((foundBlog) => {
      const { user_id, created_at } = foundBlog;
      const blog = {
        user_id: user_id,
        title: title,
        body: body,
        slug: _.kebabCase(title),
        created_at: created_at,
      };
      Blog.findByIdAndUpdate(id, blog, {
        new: true,
        runValidators: true,
        context: "query",
      })
        .then((updatedBlog) => {
          res.json(updatedBlog);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

module.exports = blogsRouter;
