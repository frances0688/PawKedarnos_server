const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Pet = require("../models/Pet.model");


//  GET /api/users -  Retrieves all of the users
router.get("/users", (req, res, next) => {
  User.find()
    .populate("pets request booking")
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.json(err));
});

//  GET /api/users/:userId -  Retrieves a specific user by id
router.get("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each user document has `pets` array holding `_id`s of pets elements
  // We use .populate() method to get swap the `_id`s for the actual pet element
  User.findById(userId)
    .populate("pets request booking")
    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

//  GET /api/users/:userId/pets -  Retrieves all pets under specific user by id
router.get("/users/:userId/pets", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each user document has `pets` array holding `_id`s of pets elements
  // We use .populate() method to get swap the `_id`s for the actual pet element
  User.findById(userId)
    .populate("pets request booking")
    .then((user) => res.status(200).json(user.pets))
    .catch((error) => res.json(error));
});

// PUT  /api/users/:usertId  -  Updates a specific user by id
router.put("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.json(error));
});

// DELETE  /api/users/:userId  -  Deletes a specific user by id
router.delete("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndRemove(userId)
    .then(() =>
      res.json({
        message: `User with ${userId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;