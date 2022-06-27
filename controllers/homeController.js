const Category = require("../models/category");
const EcopicksBrand = require("../models/ecopicksBrand");
const {respondNoResourceFound} = require("./errorController");

/**
 * Render the index.ejs file (index page).
 */
module.exports = {
  /**
   * Get all app from data base
   */
  getPopularBrands: (req, res, next) => {
    EcopicksBrand.find({popular: true},(error, brands) => {
      try {
        const brandsList = brands.slice(0, 9);
        res.locals.popularBrands = brandsList;
      }
      catch(error) {
        console.log(error);
        respondNoResourceFound(req, res);
      }

      next();
    })
  },

  renderIndex: async (req, res) => {
    if (req.query.format === "json") {
      res.json(req.data);
    } else {
      res.render("index", {
        categories: await Category.find({}),
        data: req.data,
        userId: req.params.userId
      });
    }
  }
}
