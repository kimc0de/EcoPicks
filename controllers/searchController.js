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

//
// if (allBrands && allBrands.length > 0) {
//     res.locals.results = allBrands;
//     res.locals.noResults = false;
// }
// if (allProds && allProds.length > 0) {
//     res.locals.results = allProds;
//     res.locals.noResults = false;
// }
// if (allProds && allProds.length > 0 && allBrands && allBrands.length > 0){
//     const resultsArray = allProds.concat(allBrands);
//     // filter duplicates
//     const finalResults = resultsArray.filter((thing, index, self) =>
//             index === self.findIndex((t) => (
//                 t.name === thing.name
//             ))
//     )
//
//     res.locals.results = finalResults;
//     res.locals.noResults = false;
// }
/**
 *
 try {
    const queryString = req.body.search_field;
    const queryStrings = queryString.split(" ");
    let allQueries = [];
    queryStrings.forEach(element => {
        allQueries.push({name: {$regex: String(element), $options: "i"}});
    });

    const allBrands = EcopicksBrands.find({$or: allQueries});

    if (!allBrands || allBrands.length === 0) res.status(400).send({error: "No brand was found"});

    // res.locals.results = allBrands;
    res.status(200).send(allBrands);

    next();
} catch (error) {
    console.log(error);
    respondNoResourceFound(req, res);
}
 let allProducts = [];
 queryStrings.forEach(element => {
            allProducts.push({keywords : { $all: String(element)}});
        });
 const allCategories = await Category.find({$or : allProducts});
 let productQueries = [];
 allCategories.forEach(element => {
            productQueries.push({category: String(element._id)});
        })

 const allProds =  await EcopicksBrands.find({$or : productQueries});
 */
