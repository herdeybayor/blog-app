const usersRouter = require("express").Router();
const User = require("../models/users");

usersRouter.get("/", (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => next(error));
});

usersRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((foundUser) => res.status(200).json(foundUser))
    .catch((error) => next(error));
});

usersRouter.post("/", (req, res, next) => {
  const { email, name } = req.body;
  const newUser = new User({
    name: name,
    email: email,
    created_at: new Date(),
    isAdmin: true,
  });

  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch((error) => next(error));
});

usersRouter.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  User.findById(id)
    .then((foundUser) => {
      const { created_at, isAdmin, email } = foundUser;
      const user = {
        email: email,
        name: name,
        created_at: created_at,
        isAdmin: isAdmin,
      };
      User.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
        context: "query",
      })
        .then((updatedUser) => {
          res.json(updatedUser);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

usersRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

module.exports = usersRouter;
