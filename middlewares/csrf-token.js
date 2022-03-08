function addCsrfToken(req, res, next) {
  // this setup is awailable in all views to be used to protect the forms from CSRF attacks
  res.locals.csrfToken = req.csrfToken();

  next();
}

module.exports = addCsrfToken;
