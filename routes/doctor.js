const express = require('express');
const router = express.Router();
const Appointment = require("../models/Appointment");
const commonMiddlewares = require("../helpers/commonMiddlewares");
const ObjectId = require('mongoose').Types.ObjectId;

// Doctor's dashboard view
router.get('/', commonMiddlewares.isDoctor, (req, res, next) => {
  let { user } = req;

  Appointment.find({ "_doctor": ObjectId(user._id) })
    .populate("_client")
    .then(appointments => {
      res.render('index-doctor', { appointments });
    })
    .catch(err => console.log(err));
});

router.get("/citas/:id", commonMiddlewares.isDoctor, (req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => {
      res.render("appointment-form", { appointment })
    })
    .catch(err => {
      res.status(500);
      res.render('error');
      console.log(err);
    })
});

router.post("/citas/:id/edit", commonMiddlewares.isDoctor, (req, res) => {
  Appointment.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => {
      res.redirect('/doctor');
    })
    .catch(err => {
      res.status(500);
      res.render('error');
      console.log(err);
    })
});

router.get("/citas/:id/delete", commonMiddlewares.isDoctor, (req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/doctor');
    })
    .catch(err => {
      res.status(500);
      res.render('error');
      console.log(err);
    })
});

module.exports = router;