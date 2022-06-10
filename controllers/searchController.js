const EcopicksBrands = require("../models/ecopicksBrand");
const Category = require("../models/category");
const httpStatus = require("http-status-codes");
const {respondNoResourceFound} = require("./errorController");

module.exports = {
    renderSearchPage: (req, res) => {
        res.render("search/search", {
            query: res.locals.query,
            // results: res.locals.results,
        });
    },

    getSearchResults: (req, res, next) => {
        if(req.query.q) {
            try {
                res.locals.query = req.query.q;
                next();
            } catch(error) {
                console.log(error);
                respondNoResourceFound(req, res);
            }
        } else {
            // adding warning when search field is empty
           next();
        }
    },
}

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
