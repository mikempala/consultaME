const express = require('express');
const router  = express.Router();
const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");
const commonMiddlewares = require("../helpers/commonMiddlewares");
const ObjectId = require('mongoose').Types.ObjectId;

// Displays the user's appointments
router.get("/", commonMiddlewares.isLoggedIn, (req, res) => {
  Appointment.find({"_client": ObjectId(req.user._id)})
  .then((appointments) => {
    console.log(appointments)
    res.render("prescripcion", { appointments });
  })
  .catch(err => console.log(err));
});

router.get("/:id", commonMiddlewares.isLoggedIn, (req, res) => {
  Prescription.find({"_appointment": ObjectId(req.params.id)})
  .then((appointment) => {
    console.log(appointment)
    res.render("prescripcion", { appointment });
  })
  .catch(err => console.log(err));
});

module.exports = router;