const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const commonMiddlewares = require("../helpers/commonMiddlewares");
const moment = require('moment');

// Confirms the user's profile
router.get("/confirm/:id", (req, res) => {
  let confirmCode = decodeURIComponent(req.params.id);

  User.findOneAndUpdate(confirmCode, {"status": "Active"})
  .then(user => res.render("confirm", { user }));
});

// Displays the user's profile
router.get("/", commonMiddlewares.isLoggedIn, (req, res) => {
  let user = req.user;
  let birthday = moment(req.body.birthday).utc().format("YYYY-MM-DD");

  res.render("perfil", { user, birthday });
});

// Edit profile
router.post("/edit", commonMiddlewares.isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(req.user._id, { $set: req.body })
  .then(() => {
    res.redirect('/perfil');
  })
  .catch(err => {
    res.status(500);
    res.render('error');
    console.log(err);
  })
});

// Delete profile
router.post("/delete", commonMiddlewares.isLoggedIn, (req, res) => {
  User.findByIdAndDelete(req.user._id, { $set: req.body })
  .then(() => {
    res.redirect('/');
  })
  .catch(err => {
    res.status(500);
    res.render('error');
    console.log(err);
  })
});

module.exports = router;