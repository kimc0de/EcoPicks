const httpStatus = require('http-status-codes');
const EcopicksBrand = require("../models/ecopicksBrand");
const Category = require("../models/category");
const { respondNoResourceFound } = require("./errorController");

module.exports = {

  getAllCategories: async (req, res, next) => {
    try {
      let categories = await Category.find({});
      res.locals.categories = categories;
      next();
    }
    catch(error) {
      respondNoResourceFound(req, res);
    }
  },

  renderCategoryFilteredResult: async (req, res) => {
    try {
      if (req.query.format === "json") {
        res.json(req.data);
      } else {
        res.render("ecopicksBrands/brandsByCategory", {
          categories: await Category.find({}),
          data: req.data,
          results: res.locals.results,
          categoryName: res.locals.categoryName,
        });
        // res.json(res.locals.results[0].category);
      }
    } catch (error) {
      respondNoResourceFound(req, res);
    }
  },

  getBrandsByCategory: async (req, res, next) => {
    try {
      if (req.params.categoryName === 'all') {
        let allBrands = await EcopicksBrand.find({});
        let brands = [];

        let promise = allBrands.map(async (a) => {
          brands.push({
            "_id": a._id,
            "category": await Category.findById(a.category),
            "name": a.name,
            "website": a.website,
            "slogan": a.slogan,
            "description": a.description,
            "savedBy": a.savedBy,
            "image": a.image,
          });
        });
        await Promise.all(promise);
        res.locals.results = brands;
      } else {
        let categories = await Category.find({ endpoint: req.params.categoryName });
        res.locals.categoryName = categories[0].name;

        let allBrands = await EcopicksBrand.find({ category: categories[0]._id });
        let brands = [];

        allBrands.forEach((a) => {
          brands.push({
            "_id": a._id,
            "category": categories[0],
            "name": a.name,
            "website": a.website,
            "slogan": a.slogan,
            "description": a.description,
            "savedBy": a.savedBy,
            "image": a.image,
          });
        });

        res.locals.results = brands;
      }

      next();
    }
    catch (error) {
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
