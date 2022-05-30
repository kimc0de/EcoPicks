const httpStatus = require('http-status-codes');
const {respondNoResourceFound, redirectIfUnauthorized} = require("../controllers/errorController");
const EcopicksBrand = require("../models/ecopicksBrand");

module.exports = {

  getAllSavedBrands: async (req, res, next) => {
    try {
      if (!req.user) {
        redirectIfUnauthorized(req, res)
      } else {
        let savedBrands = req.user.savedBrands;
        res.locals = await EcopicksBrand.find({apps: savedBrands._id});
        next()
      }
    } catch (error) {
      console.log(error);
      respondNoResourceFound(req, res);
    }
  },


  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },

}
