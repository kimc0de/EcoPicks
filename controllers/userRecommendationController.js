const {redirectIfUnauthorized, respondNoResourceFound} = require("./errorController");
const RecommendedBrand = require("../models/recommendedBrand");
const User = require("../models/user");

module.exports = {
    renderRecommendPage: (req, res) => {
        res.render("pages/recommendNewBrand");
    },

    saveUserRecommendation: async (req, res) => {
        redirectIfUnauthorized(req, res);

        try {
            let currentUser = req.user;
            let newRecommendation = new RecommendedBrand({
                brandName: req.body.brandName,
                website: req.body.website,
                reason: req.body.reason,
                description: req.body.description || "",
                userId: currentUser._id,
                approved: false,
            });

            await newRecommendation.save();
            await  User.findByIdAndUpdate(currentUser._id, {
                $addToSet: {recommendedBrands: newRecommendation._id}
            }).then (() => {
                res.render("pages/confirmation");
            })
        } catch (error) {
            respondNoResourceFound(req, res);
        }
    },

    getAllRecommendedBrands: async (req, res, next) => {
        redirectIfUnauthorized(req, res);

        try {
            res.locals.recommendedBrands = await RecommendedBrand.find({ userId: req.user._id });
            next();
        } catch (error) {
            respondNoResourceFound(req, res);
        }
    },

    /**
     * Delete recommended brand
     */
    deleteRecommendedBrand: async (req, res) => {
        redirectIfUnauthorized(req, res);

        try {
            let brandId = req.params.id;
            let deletedBrand = await RecommendedBrand.findById(brandId);
            if(!deletedBrand.approved) {
                // Remove from user's recommended collection
                await User.findByIdAndUpdate(deletedBrand.userId, {
                    $pull: {recommendedBrands: deletedBrand._id}
                }, {new: true});
                // Keep the recommendation but only remove userId
                await RecommendedBrand.findByIdAndUpdate(brandId,
                    {userId: null}, {new: true});
                req.flash("success", `Your recommended brand has been deleted.`);
                res.redirect("/user");
            } else { // prevent deleting with deeplink
                req.flash("error", `Error! Please do not delete Ecopicks approved brand`);
                res.redirect("/user");
            }
        } catch (error) {
            console.log(error);
            respondNoResourceFound(req, res);
        }
    }
}
