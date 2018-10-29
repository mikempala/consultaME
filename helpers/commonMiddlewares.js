// Checks if user is logged in. If not, redirects to home
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/");
};