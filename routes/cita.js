const express = require('express');
const router  = express.Router();
const Appointment = require("../models/Appointment");
const commonMiddlewares = require("../helpers/commonMiddlewares");
const ObjectId = require('mongoose').Types.ObjectId;

// Displays the user's appointments
router.get("/", commonMiddlewares.isLoggedIn, (req, res) => {
  Appointment.find({"_client": ObjectId(req.user._id)})
  .then((appointments) => {
    res.render("cita", { appointments });
  })
  .catch(() => {
    res.status(500);
    res.render('error');
  })
});

// New appointment
router.post("/new", commonMiddlewares.isLoggedIn, (req, res) => {

  let _client = req.user._id;

  const { date, description } = req.body;

  Appointment.create({ _client, date, description })
    .then(() => {
      res.redirect("/cita");
    })
    .catch(() => {
      res.status(500);
      res.render('error');
    });
});

// Edit appointment
router.post("/edit/:id", commonMiddlewares.isLoggedIn, (req, res) => {
  Appointment.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(() => {
    res.redirect('/cita');
  })
  .catch(() => {
    res.status(500);
    res.render('error');
  })
});

module.exports = router;