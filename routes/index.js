const express = require('express');
const router  = express.Router();
const passport = require("passport");
const User = require("../models/User");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

  const address = {
    street: req.body.street,
    district: req.body.district,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
  };

  const { email, name, surname, birthday, telephone, password } = req.body;

  User.register({ email, name, surname, birthday, telephone, address }, password)
    .then(user => {

      // Sends confirmation code
      let encodeCode = encodeURIComponent(user._id);

      const msg = {
        to: user.email,
        from: 'consultaME.app@gmail.com',
        subject: 'Confirma tu cuenta',
        html: `<body style="background-color: #2B2F30; color: black">
        <div style="font-family: 'Helvetica Neue', Helvetica; text-align: center; padding: 5px;">
          <h1 style="color: white">consultaME</h1>
          <div style="width: 80%;      max-width: 800px;      font-weight: 300;      margin: 0 auto;      background-color: white;      border-radius: 15px;      padding: 15px;      padding-bottom: 15px;">
            <h1 style="font-size: 24px; font-weight: 100;">Confirmación de Email</h1>
            <p style="font-size: 18px; line-height: 1.5;">¡Hola! <br><br> Muchas gracias por usar consultaME. Para poder agendar citas, tendrás que activar tu cuenta dando click al botón de abajo</p>
            <a href="https://consultame-app.herokuapp.com/perfil/confirm/${encodeCode}" style="padding: 15px;        font-family: 'Helvetica Neue', Helvetica; text-size: 18px; color: white; background-color: #52C3FB; border: 0; border-radius: 5px; margin: 10px; display: block; max-width: 200px; margin: auto; text-decoration: none;">Confirmar Correo</a>
            <hr style="width: 50%; margin-top: 5%">
            <p style="line-height: 1.5;">¡Muchas gracias!</p>
            <p style="font-size: 14px">Equipo consultaME</p>
          </div>
        </div>
      </body>`,
      };

      sgMail.send(msg);

      res.render("index", { msg: `Por favor confirma tu cuenta. Un link se ha enviado a ${email}` });
    })
    .catch(err => console.log(err));
});

// Facebook register
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/profile",
  failureRedirect: "/",
  scope: ['profile_pic', 'email', 'birthday']
}));

// Logout
router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;