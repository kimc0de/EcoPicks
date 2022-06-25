const EcopicksBrand = require("../models/ecopicksBrand");
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
        editBrand = await EcopicksBrand.findById(editBrandId);
      } catch (error) {
        console.error(error);
        respondNoResourceFound(req, res);
      }
    }

    res.render("ecopicksBrands/addNewBrand", {
      categories: await Category.find({}),
      app: editBrand
    });
  },

  addNewBrand: async (req, res) => {
    let brandImage;
    if (req.file) {
      let imgBuffer = fs.readFileSync(req.file.path);
      brandImage = `data:${req.file.mimetype};base64,` + imgBuffer.toString('base64');
    } else {
      brandImage = '/images/ecopicksLogo/logo2.svg';
    }

    try {
      let newBrand = new EcopicksBrand({
        category: req.body.category,
        name: req.body.name,
        website: req.body.website,
        slogan: req.body.slogan,
        description: req.body.description,
        image: brandImage
      });

      await newBrand.save().then(() => {
        res.render("ecopicksBrands/confirmation");
      });

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
      const brand = await EcopicksBrand.findByIdAndUpdate(appId, {
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
      let brand = await EcopicksBrand.findByIdAndRemove(brandId);
      await User.findByIdAndUpdate(brand.userId, {
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
      const brand = await EcopicksBrand.findById(id);
      const category = await Category.findById(brand.category);

      if (req.user) {
        let userSavedBrands = req.user.savedBrands;
        let isSaved = userSavedBrands.includes(brand._id);

        res.render('ecopicksBrands/detailsPage',
            {
              id: id,
              brand: brand,
              categoryClass: category.lightColor,
              brandImg: brand.image,
              isSaved: isSaved,
            });
      } else {
        res.render('ecopicksBrands/detailsPage',
            {
              id: id,
              brand: brand,
              categoryClass: category.lightColor,
              brandImg: brand.image,
              isSaved: false,
            });
      }
    } catch (error) {
      console.error(error);
      respondNoResourceFound(req, res);
    }
  },

}
