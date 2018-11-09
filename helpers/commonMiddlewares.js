// Checks if user is logged in or has verified account. If not, redirects to home.
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.user.status === "Active" ) return next();
  if (req.isAuthenticated() && req.user.status !== "Active") return res.render("index", { msg: "Necesitas confirmar tu cuenta" });
  return res.render("index", { msg: "Necesitas iniciar sesión para acceder" });
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin" ) return next();
  return res.render("index", { msg: "Necesitas ser administrador para poder acceder" });
};

exports.isDoctor = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "doctor" ) return next();
  return res.render("index", { msg: "Necesitas ser doctor para acceder" });
};

exports.isSecretary = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "secretary" ) return next();
  return res.render("index", { msg: "Necesitas ser secretaria/secretario para acceder" });
};