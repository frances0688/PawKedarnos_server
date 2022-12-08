const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Pet = require("../models/Pet.model");
const User = require("../models/User.model");

//  POST /api/pets  -  Creates a new pet
router.post("/pets", (req, res, next) => {
    const {
        name,
        typeOfPet,
        weight,
        ageYears,
        ageMonths,
        gender,
        breed,
        microchipped,
        spayedOrNeutered,
        houseTrained,
        friendlyWithDogs,
        friendlyWithCats,
        about,
        pottySchedule,
        energy,
        feedingSchedule,
        canBeAlone,
        medication,
        otherCareInfo,
        vetName,
        vetNumber,
        vetStreet,
        vetCity,
        vetState,
        vetZip,
        additionalVetInfo,
        photo,
        owner,
      } = req.body;

  Pet.create({
        name,
        typeOfPet,
        weight,
        ageYears,
        ageMonths,
        gender,
        breed,
        microchipped,
        spayedOrNeutered,
        houseTrained,
        friendlyWithDogs,
        friendlyWithCats,
        about,
        pottySchedule,
        energy,
        feedingSchedule,
        canBeAlone,
        medication,
        otherCareInfo,
        vetName,
        vetNumber,
        vetStreet,
        vetCity,
        vetState,
        vetZip,
        additionalVetInfo,
        photo,
        owner: userId,
    })
    .then((newPet) => {
      return User.findByIdAndUpdate(userId, {
        $push: { pets: newPet._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/pets/:petId  - Retrieves a specific pet by id
router.get("/pets/:petId", (req, res, next) => {
  const { petId } = req.params;

  Pet.findById(petId)
    .then((pet) => res.json(pet))
    .catch((error) => res.json(error));
});

// PUT  /api/pets/:petId  - Updates a specific pet by id
router.put("/pets/:petId", (req, res, next) => {
  const { petId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(petId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Pet.findByIdAndUpdate(petId, req.body, { new: true })
    .then((updatedPet) => res.json(updatedPet))
    .catch((err) => res.json(err));
});

//  DELETE /api/pets/:petId  - Deletes a specific pet by id
router.delete("/pets/:petId", (req, res, next) => {
  const { petId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(petId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Pet.findByIdAndRemove(petId)
    .then(() =>
      res.json({ message: `Pet with ${petId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

module.exports = router;