const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Request = require("../models/Request.model");
const Booking = require("../models/Booking.model")

router.get("/bookings", (req, res, next) => {
    Booking.find()
      .populate("owner")
      .populate("pet")
      .populate("request")
      .then((allBookings) => res.json(allBookings))
      .catch((err) => res.json(err));
});

router.get("/users/:userId/bookings", (req, res, next) => {
    const { userId } = req.params;
    Booking.find({owner: userId})
      .populate("owner")
      .populate("pet")
      .populate("request")
      .then((allBookings) => res.json(allBookings))
      .catch((err) => res.json(err));
});

router.post("/users/:userId/bookings/add", (req, res, next) => {
  console.log(req.body)
    const {
        service,
        owner,
        pet,
        request,
        startDateTime,    
        endDateTime
      } = req.body;

  Booking.create({
        service,
        owner,
        pet,
        request,
        startDateTime,    
        endDateTime
    })
    .then((newBooking) => {
      console.log("newBooking: ", newBooking)
      return User.findByIdAndUpdate(owner, {
        $push: { booking: newBooking._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
    
});

router.get("/users/:userId/bookings/:bookingId", (req, res, next) => {
    const { bookingId } = req.params;
  
  Booking.findById(bookingId)
    .populate("owner")
    .populate("pet")
    .populate("request")
    .then((booking) => res.json(booking))
    .catch((error) => res.json(error));
});

router.put("/users/:userId/bookings/:bookingId", (req, res, next) => {
  const { bookingId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Booking.findByIdAndUpdate(bookingId, req.body, { new: true })
    .populate("owner")
    .populate("pet")
    .populate("request")  
    .then((updatedBooking) => res.json(updatedBooking))
    .catch((err) => res.json(err));
});

router.delete("/users/:userId/bookings/:bookingId", (req, res, next) => {
  const { bookingId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Booking.findByIdAndRemove(bookingId)
    .then(() =>
      res.json({ message: `Booking with ${bookingId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

module.exports = router;