const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Request = require("../models/Request.model")


router.get("/resquest", (req, res, next) => {
    Request.find()
        .populate("owner")
        .populate("pet")
        .then((allRequests) => res.json(allRequests))
        .catch((err) => res.json(err));
});

router.get("/users/:userId/requests", (req, res, next) => {
    const { userId } = req.params;
    Request.find({owner: userId})
        .populate("owner")
        .populate("pet")
        .then((allRequests) => res.json(allRequests))
        .catch((err) => res.json(err));
});

router.post("/users/:userId/requests/add", (req, res, next) => {
  console.log(req.body)
    const {
        service,
        owner,
        pet,
        startDateTime,    
        endDateTime,
        isDeclined
      } = req.body;

  Request.create({
        service,
        owner,
        pet,
        startDateTime,    
        endDateTime,
        isDeclined
    })
    .then((newRequest) => {
      console.log("newRequest: ", newRequest)
      return User.findByIdAndUpdate(owner, {
        $push: { request: newRequest._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
    
});

router.get("/users/:userId/requests/:requestId", (req, res, next) => {
    const { requestId } = req.params;
  
  Request.findById(requestId)
    .populate("owner")
    .populate("pet")
    .then((request) => res.json(request))
    .catch((error) => res.json(error));
});

router.put("/users/:userId/requests/:requestId", (req, res, next) => {
  const { requestId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Request.findByIdAndUpdate(requestId, req.body, { new: true })
    .then((updatedRequest) => res.json(updatedRequest))
    .catch((err) => res.json(err));
});

router.delete("/users/:userId/requests/:requestId", (req, res, next) => {
    const { requestId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
    
    Request.findByIdAndRemove(requestId)
    .then(() =>
    res.json({ message: `Request with ${requestId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});


module.exports = router;