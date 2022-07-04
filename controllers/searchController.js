const EcopicksBrand = require("../models/ecopicksBrand");
const Category = require("../models/category");

module.exports = {
    renderSearchPage: async (req, res) => {
        res.render("pages/search", {
            query: res.locals.query,
            results: res.locals.results,
            categories: await Category.find({}),
            noResults: res.locals.noResults,
            popularBrands: res.locals.popularBrands,
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
                let searchResults = await EcopicksBrand.find({$or: [...brandQueries, ...productQueries]});
                let brands = [];

                let promise = searchResults.map(async (a) => {
                    brands.push({
                        "_id": a._id,
                        "category": await Category.findById(a.category),
                        "name": a.name,
                        "endpoint": a.endpoint,
                        "website": a.website,
                        "slogan": a.slogan,
                        "description": a.description,
                        "image": a.image,
                        "savedBrands": a.savedBrands,
                        "popular": a.popular,
                    });
                });

                await Promise.all(promise);
                res.locals.results = brands;
                res.locals.noResults = false;

            } catch (error) {
                console.log(error);
                res.locals.noResults = true;
            }
        }
        next();
    },
}
