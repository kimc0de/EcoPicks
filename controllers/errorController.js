const httpStatus = require('http-status-codes');

module.exports = {

  respondNoResourceFound: (req, res) => {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    let errorMessage = "We are sorry! The page you were trying to access could not be found on Ecopicks."
    res.status(errorCode);
    res.render('pages/error', {
      errorCode: errorCode,
      errorMessage: errorMessage
    });
  },

  respondInternalError: (error, req, res) => {
    let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    let errorMessage = "We are sorry! There is an internal server problem."
    res.status(errorCode);
    res.render('page/error', {
      errorCode: errorCode,
      errorMessage: errorMessage
    })
  },

  redirectIfUnauthorized: (req, res) => {
    if (!req.user) {
      req.flash("error", "Please log in to continue.");
      res.redirect("/login");
    }
  }
}
