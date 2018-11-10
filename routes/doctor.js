const express = require('express');
const router = express.Router();
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const commonMiddlewares = require("../helpers/commonMiddlewares");
const ObjectId = require('mongoose').Types.ObjectId;

// Doctor's view of current appointments
router.get('/', commonMiddlewares.isDoctor, (req, res, next) => {
  let { user } = req;

  Appointment.find({ "_doctor": ObjectId(user._id) })
    .populate("_client")
    .then(appointments => {
      res.render('index-doctor', { appointments });
    })
    .catch(() => {
      res.status(500);
      res.render('error');
    })
});

// Form used to edit appointments
router.get("/citas/:id", commonMiddlewares.isDoctor, (req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => {
      res.render("appointment-form", { appointment })
    })
    .catch(() => {
      res.status(500);
      res.render('error');
    })
});

router.post("/citas/:id/edit", commonMiddlewares.isDoctor, (req, res) => {
  Appointment.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => {
      res.redirect('/doctor');
    })
    .catch(() => {
      res.status(500);
      res.render('error');
    })
});

// Deletes appointment
router.get("/citas/:id/delete", commonMiddlewares.isDoctor, (req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/doctor');
    })
    .catch(() => {
      res.status(500);
      res.render('error');
    })
});

// Form to create new prescription
router.get('/citas/:id/prescripcion', commonMiddlewares.isDoctor, (req, res) => {
  let { id } = req.params;
  res.render("prescripcion-form", { id });
});

router.post('/citas/:id/prescripcion/new', commonMiddlewares.isDoctor, (req, res) => {

  let  _appointment = req.params.id;

  let { prescription, notes } = req.body;

  Prescription.create({ _appointment, prescription, notes })
  .then(() => {
    res.redirect("/doctor");
  })
  .catch(() => {
    res.status(500);
    res.render('error');
  });
});

module.exports = router;