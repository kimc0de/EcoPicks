const EcopicksBrands = require("../models/ecopicksBrand");
const Category = require("../models/category");

module.exports = {
    renderSearchPage: (req, res) => {
        if (req.query.format === "json") {
            res.json(req.data);
        } else {
            res.render("search/search");
        }
    }
}
