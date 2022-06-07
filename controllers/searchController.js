const EcopicksBrands = require("../models/ecopicksBrand");
const Category = require("../models/category");
const httpStatus = require("http-status-codes");
const {respondNoResourceFound} = require("./errorController");

module.exports = {
    renderSearchPage: (req, res) => {
        if (req.query.format === "json") {
            res.json(req.data);
        } else {
            res.render("search/search");
        }
    },

    getSearchResults: async (req,res) => {
        try {
            const queryString = req.body.query;
            const queryStrings = queryString.split(" ");
            let allQueries = [];
            queryStrings.forEach(element => {
                allQueries.push({name : {$regex : String(element), $options : "i"}});
            });

            const allBrands = await EcopicksBrands.find({$or : allQueries});

            if(!allBrands || allBrands.length === 0 ) res.status(400).send({error : "No brand was found"});

            res.status(200).send(allBrands);

        } catch (error) {
            respondNoResourceFound(req, res);
        }
    },
}

/**
 *
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
