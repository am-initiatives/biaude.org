module.exports = function (req, res, next) {
  res.status(404).render('error_404/app/')
}
