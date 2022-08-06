const httpStatus = require('http-status-codes');
const {
    respondInternalError,
    redirectIfUnauthorized,
    respondNoResourceFound
} = require("./errorController");
const EcopicksBrand = require("../models/ecopicksBrand");
const User = require("../models/user");

module.exports = {

  getAllSavedBrands: (req, res, next) => {
      redirectIfUnauthorized(req, res);
        try {
            res.locals.savedBrands = req.user.savedBrands;
            next();
        } catch (error) {
            respondNoResourceFound(req, res);
        }
  },

  /**
   * Save brand to saved collection
   */
  saveBrand: (req, res, next) => {
      redirectIfUnauthorized(req, res);

      try {
         let brandId = req.params.id;
         let currentUser = req.user;
         User.findByIdAndUpdate(currentUser._id, {
             $addToSet: {savedBrands: brandId}
         })
             .then(() => {
                 res.locals.success = true;
             })
             .catch((error) => {
                 next(error);
             });
         EcopicksBrand.findByIdAndUpdate(brandId, {
             $addToSet: {savedBy: currentUser._id}
         })
             .then(() => {
                 res.locals.success = true;
                 next()
             })
     } catch (error) {
          respondInternalError(error, req, res);
      }
  },

    /**
     * Remove brand from saved collection
     */
    unsaveBrands: async (req, res, next) => {
        redirectIfUnauthorized(req, res);
        try {
            let userId = req.user._id
            let brandId = req.params.id;
            let brand = await EcopicksBrand.findByIdAndUpdate(brandId,{
                $pull: {savedBy: userId}
            }, { new: true });
            await User.findByIdAndUpdate(userId, {
                $pull: { savedBrands: brand._id }
            }, { new: true });
            req.flash("success", `"${brand.name}" has been removed from saved collection.`);
            res.redirect('/user');
            next();
        } catch (error) {
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
