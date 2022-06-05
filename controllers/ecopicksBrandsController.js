const EcopicksBrands = require("../models/ecopicksBrand");
const User = require("../models/user");
const { respondNoResourceFound, redirectIfUnauthorized } = require("./errorController");
const Category = require("../models/category");
const fs = require("fs");

module.exports = {
  renderNewBrand: async (req, res) => {
    redirectIfUnauthorized(req, res);

    let editBrandId = req.params.id;
    let editBrand;

    if (editBrandId) {
      try {
        editBrand = await EcopicksBrands.findById(editBrandId);
      } catch (error) {
        console.error(error);
        respondNoResourceFound(req, res);
      }
    }

    res.render("ecopicksBrands/recommendNewBrand", {
      categories: await Category.find({}),
      app: editBrand
    });
  },

  recommendBrand: async (req, res) => {
    let brandImage;
    if (req.file) {
      let imgBuffer = fs.readFileSync(req.file.path);
      brandImage = `data:${req.file.mimetype};base64,` + imgBuffer.toString('base64');
    } else {
      brandImage = '/images/greenpick/logo3.svg';
    }

    try {
      let newBrand = new EcopicksBrands({
        category: req.body.category,
        name: req.body.name,
        website: req.body.website,
        slogan: req.body.slogan,
        description: req.body.description,
        image: brandImage,
      });

      let savedBrand = await newBrand.save();
      await User.findByIdAndUpdate(userId, {
        $addToSet: { apps: savedBrand }
      });
      res.render("ecopicksBrands/confirmation");
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },

  /**
   * Edit Ecopicks brand
   */
  editEcopicksBrand: async (req, res) => {
    let appId = req.params.id;

    let appParams = {
      category: req.body.category,
      name: req.body.name,
      website: req.body.website,
      slogan: req.body.slogan,
      description: req.body.description
      //image: Buffer
    };

    try {
      const brand = await EcopicksBrands.findByIdAndUpdate(appId, {
        $set: appParams
      }, { new: true });
      res.render("ecopicksBrands/confirmation", { app: brand });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },

  /**
   * Delete Ecopicks brand
   */
  deleteEcopicksBrand: async (req, res) => {
    let brandId = req.params.id;

    try {
      let brand = await EcopicksBrands.findByIdAndRemove(brandId);
      let user = await User.findByIdAndUpdate(brand.userId, {
        $pull: { recommendedBrands: brand._id }
      }, { new: true });
      req.flash("success", `Your Ecopicks "${brand.name}" has been deleted.`);
      res.redirect(`/user`);
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },


  /**
   * Ecopicks brand details page
   */
  getDetailsPage: async (req, res) => {
    let id = req.params.id;
    try {
      const brand = await EcopicksBrands.findById(id);
      const category = await Category.findById(brand.category);

      res.render('./ecopicksBrands/detailsPage',
        {
          id: id,
          app: brand,
          categoryClass: category.className,
          appImg: brand.image
        });
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },

  /**
   * Save brand to saved collection
   */
  saveBrand: async (req, res, next) => {

    redirectIfUnauthorized(req, res);

    let userId = req.user._id;
    let brandId = req.params.id;

    try {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { savedBrands: brandId }
      });
      res.redirect("back");
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }

    next();
  },

  /**
   * Getting saved brands collection
   */
  getSavedBrands: async (req, res) => {
    try {
      let savedBrands = await EcopicksBrands.find({ userId: req.user._id });
      req.data = savedBrands;
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  }
}
