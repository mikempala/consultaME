const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const commonMiddlewares = require("../helpers/commonMiddlewares");
const ObjectId = require('mongoose').Types.ObjectId;

// Admin view
router.get('/', commonMiddlewares.isAdmin, (req, res, next) => {
  User.find()
    .then(users => {
      res.render('index-admin', { users });
    })
});

router.get('/citas'), commonMiddlewares.isAdmin, (req, res, next) => res.redirect('/admin');

// Appointments view (by user)
router.get('/citas/:user_id', commonMiddlewares.isAdmin, (req, res, next) => {
  Appointment.find({"_client": ObjectId(req.params.user_id)})
    .populate("_client")
    .populate("_doctor")
    .then(appointments => {
      res.render('index-admin', { appointments });
    })
});

// Delete appointment
router.post("/citas/delete/:id", commonMiddlewares.isAdmin, (req, res) => {
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