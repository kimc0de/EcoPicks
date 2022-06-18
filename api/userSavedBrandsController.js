const httpStatus = require('http-status-codes');
const {respondNoResourceFound, redirectIfUnauthorized} = require("../controllers/errorController");
const EcopicksBrand = require("../models/ecopicksBrand");
const EcopicksBrands = require("../models/ecopicksBrand");
const User = require("../models/user");

module.exports = {

  getAllSavedBrands: async (req, res, next) => {
    try {
      if (!req.user) {
        redirectIfUnauthorized(req, res);
      } else {
        let savedBrands = req.user.savedBrands;
        res.locals.savedBrands = await EcopicksBrand.find({apps: savedBrands._id});
        next()
      }
    } catch (error) {
      console.log(error);
      respondNoResourceFound(req, res);
    }
  },

  /**
   * Save brand to saved collection
   */
  saveBrand: (req, res, next) => {
      let brandId = req.params.id;
      let currentUser = req.user;

      if (!currentUser) {
          res.send(res.locals);
      } else {
        User.findByIdAndUpdate(currentUser._id, {
          $addToSet: { savedBrands: brandId }
        })
            .then(() => {
                res.locals.success = true;
            })
            .catch((error) => {
              next(error);
            });
          EcopicksBrands.findByIdAndUpdate(brandId, {
              $addToSet: {savedBy: currentUser._id}
          })
              .then(() => {
              res.locals.success = true;
              next()
          })
              .catch((error) => {
                  next(error);
              });
      }
  },

  /**
   * Getting saved brands collection
   */
  getSavedBrands: async (req, res) => {
    try {
      req.data = await EcopicksBrands.find({ userId: req.user._id });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },

  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.getStatusCode,
      data: res.locals
    });
  },
}
