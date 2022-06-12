const EcopicksBrands = require("../models/ecopicksBrand");
const Category = require("../models/category");
const httpStatus = require("http-status-codes");
const {respondNoResourceFound} = require("./errorController");

module.exports = {
    renderSearchPage: async (req, res) => {
        res.render("search/search", {
            query: res.locals.query,
            results: res.locals.results,
            categories: await Category.find({}),
            noResults: res.locals.noResults,
        });
    },

    getSearchResults: async (req, res, next) => {
        if(req.query.q) {
            try {
                res.locals.query = req.query.q;
                // Get query string from url
                const queryString = req.query.q;
                const queryStrings = queryString.split(" ");

                // query for product names
                let allProducts = [];
                queryStrings.forEach(element => {
                    allProducts.push({keywords : { $all: String(element)}});
                });
                // Find categories that have the keywords
                const allCategories = await Category.find({$or : allProducts});

                // An array of queries based on product names
                let productQueries = [];
                allCategories.forEach(element => {
                    productQueries.push({category: String(element._id)});
                })

                // An array of queries based on brand names
                let brandQueries = [];
                queryStrings.forEach(element => {
                    brandQueries.push({name: {$regex: String(element), $options: "i"}});
                });

                // Get search results
                const finalResults = await EcopicksBrands.find({$or: [...brandQueries, ...productQueries]});

                res.locals.results = finalResults;
                res.locals.noResults = false;

            } catch (error) {
                console.log(error);
                res.locals.noResults = true;
            }
        }
        next();
    },
}