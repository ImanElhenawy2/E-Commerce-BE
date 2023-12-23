const productsRouter = require("express").Router();
const Products = require("../Models/product.model");
const { AuthUser, AuthAdmin } = require("../Middlewares/Auth");

// get products --- WITHOUT AuthUser
productsRouter
    .get("/", async (req, res) => {
        try {
            let products = await Products.find();
            res.status(200).send(products);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    // get product by category "womens"
    .get("/womens",  async (req, res) => {
        try {
            let products = await Products.find({
                $where: function () {
                    return this.category.includes("Women"); //'Women'
                },
            });
            console.log(products);
            res.status(200).send(products);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    // get product by category "mens"
    .get("/mens", async (req, res) => {
        try {
            let products = await Products.find({
                $where: function () {
                    return this.category.includes("Men");
                },
            });
            res.status(200).send(products);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    // get product by category "kids"
    .get("/kids",  async (req, res) => {
        try {
            let products = await Products.find({
                $where: function () {
                    return this.category.includes("Kids");
                },
            });
            res.status(200).send(products);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    // get product by category "Brands"
    .get("/Brands",  async (req, res) => {
        try {
            let products = await Products.find({
                $where: function () {
                    return this.category.includes("Brands");
                },
            });
            res.status(200).send(products);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    // get product by id
    .get("/:id",  async (req, res) => {
        try {
            const productId = req.params.id;
            let product = await Products.findById(productId);
            res.status(200).send({ product: product });
        } catch (e) {
            console.log(e);
            res.status(500).send("error");
        }
    })
    // create products
    .post("/add-many", AuthAdmin, async (req, res) => {
        try {
            const products = await Products.insertMany(req.body);

            res.status(200).send(products);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    // update product
    .put("/update-product/:id", AuthAdmin, async (req, res) => {
        try {
            let x = await Products.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            res.status(200).send("product updated");
        } catch (err) {
            console.log(err);
            res.status(500).send("check the console");
        }
    })
    // delete product
    .delete("/delete-product/:id", AuthAdmin, async (req, res) => {
        try {
            let product = await Products.findByIdAndDelete(req.params.id);
            console.log(product);
            res.status(200).send("product deleted");
        } catch (err) {
            console.log(err);
            res.status(500).send("check the console");
        }
    });

module.exports = productsRouter;
