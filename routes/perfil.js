const express = require('express');
const router = express.Router();
const User = require("../models/User");
const commonMiddlewares = require("../helpers/commonMiddlewares");
const upload = require("../helpers/multer");
const moment = require('moment');

// Confirms the user's profile
router.get("/confirm/:id", (req, res) => {
  let confirmCode = decodeURIComponent(req.params.id);

  User.findOneAndUpdate(confirmCode, { "status": "Active" })
    .then(user => res.render("confirm", { user }));
});

// Displays the user's profile
router.get("/", commonMiddlewares.isLoggedIn, (req, res) => {
  let { user } = req;

  // Variables used to display buttons in perfil.hbs
  let doctor = false;
  let admin = false;

  if (req.user.role === "doctor") doctor = true;
  if (req.user.role === "admin") admin = true;

  let birthday = moment(req.body.birthday).utc().format("YYYY-MM-DD");

  res.render("perfil", { user, birthday, doctor, admin });
});

// Edit profile
router.post("/edit", commonMiddlewares.isLoggedIn, upload.single('profile_pic'), (req, res) => {
  if (req.body.profile_pic) req.body.profile_pic = req.file.url // Uploads the image and updates the user's photo

  User.findByIdAndUpdate(req.user._id, { $set: req.body })
    .then(() => {
      res.redirect('/perfil');
    })
    .catch(() => {
      res.status(500);
      res.render('error');
    })
});

// Delete profile
router.post("/delete", commonMiddlewares.isLoggedIn, (req, res) => {
  User.findByIdAndDelete(req.user._id, { $set: req.body })
    .then(() => {
      res.redirect('/');
    })
    .catch(() => {
      res.status(500);
      res.render('error');
    })
});

module.exports = router;