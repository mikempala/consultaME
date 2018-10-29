const express = require('express');
const router  = express.Router();
const passport = require("passport");
const User = require("../models/User");
const commonMiddlewares = require("../helpers/commonMiddlewares");

// Home
router.get('/', (req, res, next) => {
  res.render('index');
});

// Login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/perfil",
  failureRedirect: "/"
}));

// Register
router.post("/register", (req, res) => {
  if (req.body.password !== req.body.confirmPassword) return res.render("index", { msg: "Las contraseñas no coinciden" });

  let address = {
    street: req.body.street,
    district: req.body.district,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
  };

  const { email, name, surname, birthday, telephone, password } = req.body;

  User.register({ email, name, surname, birthday, telephone, address }, password)
    .then(user => {
      res.redirect("/perfil");
      console.log(`Se creo usuario ${user}`);
    })
    .catch(err => console.log(err));
});

// Logout
router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;