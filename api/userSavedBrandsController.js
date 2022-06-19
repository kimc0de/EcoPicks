const httpStatus = require('http-status-codes');
const {
    respondInternalError,
    redirectIfUnauthorized,
    respondNoResourceFound
} = require("../controllers/errorController");
const EcopicksBrands = require("../models/ecopicksBrand");
const User = require("../models/user");

module.exports = {

  getAllSavedBrands: (req, res, next) => {
      redirectIfUnauthorized(req, res);
        try {
            let savedBrands = req.user.savedBrands;
            res.locals.savedBrands = savedBrands;
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
         EcopicksBrands.findByIdAndUpdate(brandId, {
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
    removeBrandsFromCollection: async (req, res, next) => {
        redirectIfUnauthorized(req, res);
        try {
            let userId = req.user._id
            let brandId = req.params.id;
            let brand = await EcopicksBrands.findByIdAndUpdate(brandId,{
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
