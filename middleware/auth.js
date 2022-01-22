function authenticator(req, res, next) {
  if (req.authenticator) {
    return next()
  }
  req.flash('loginfirst-warning-message', 'You need to login first!!')
  res.redirect('/users/login')

}

exports = module.exports = { authenticator } 