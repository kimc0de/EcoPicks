const Category = require("../models/category");

/**
 * Render the index.ejs file (index page).
 */
module.exports = {
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
  },
  renderAboutPage: (req, res) => {
    res.render("pages/about");
  }
}
