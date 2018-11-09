const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const commonMiddlewares = require("../helpers/commonMiddlewares");

// Admin view
router.get('/', commonMiddlewares.isAdmin, (req, res, next) => {
  User.find()
    .then(users => {
      res.render('index-admin', { users });
    })
});

// Appointments view (by user)
router.get('perfil/citas/:user_id', commonMiddlewares.isAdmin, (req, res, next) => {
  Appointment.findOne({_client: req.param.user_id})
    .populate("_client", "name")
    .then(appointment => {
      res.render('index-admin', { appointment });
    })
});

// Delete appointment
router.post("/appointment/delete/:id", commonMiddlewares.isAdmin, (req, res) => {
  Appointment.findByIdAndDelete(req.user._id, { $set: req.body })
  .then(() => {
    res.redirect('/cita');
  })
  .catch(err => {
    res.status(500);
    res.render('error');
    console.log(err);
  })
});

// Delete appointment
router.post("/appointment/delete/:id", commonMiddlewares.isAdmin, (req, res) => {
  Appointment.findByIdAndDelete(req.user._id, { $set: req.body })
  .then(() => {
    res.redirect('/cita');
  })
  .catch(err => {
    res.status(500);
    res.render('error');
    console.log(err);
  })
});

module.exports = router;