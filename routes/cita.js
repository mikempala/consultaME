const express = require('express');
const router  = express.Router();
const Appointment = require("../models/Appointment");
const commonMiddlewares = require("../helpers/commonMiddlewares");

// Displays all appointments
router.get("/", commonMiddlewares.isLoggedIn, (req, res) => {
  Appointment.find()
  .then((appointments) => {
    res.render("cita", { appointments });
  })
  .catch(err => console.log(err));
});

// New appointment
router.post("/new", commonMiddlewares.isLoggedIn, (req, res) => {

  let _client = req.user._id;

  const { date, description } = req.body;

  Appointment.create({ _client, date, description })
    .then(() => {
      res.redirect("/cita");
      console.log(`Se creo cita ${appointment}`);
    })
    .catch(err => console.log(err));
});

// Edit appointment
router.post("/edit/:id", commonMiddlewares.isLoggedIn, (req, res) => {
  Appointment.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(() => {
    res.redirect('/cita');
  })
  .catch(err => {
    console.log(err);
  })
});

module.exports = router;