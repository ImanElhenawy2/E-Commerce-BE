const brandsRouter = require("express").Router();
const Brands = require("../Models/brand.model");
const { AuthUser, AuthAdmin } = require("../Middlewares/Auth");

// get brands
brandsRouter
    .get("/", AuthUser, async (req, res) => {
        try {
            let brands = await Brands.find();
            res.status(200).send(brands);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    // get brand by id
    .get("/:id", AuthUser, async (req, res) => {
        try {
            const brandId = req.params.id;
            let brand = await Brands.findById(brandId);
            res.status(200).send({ brand: brand });
        } catch (e) {
            console.log(e);
            res.status(500).send("error");
        }
    })
    // create brands
    .post("/add-many", AuthAdmin, async (req, res) => {
        try {
            const brands = await Brands.insertMany(req.body);

            res.status(200).send(brands);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    // update brand
    .put("/update-brand/:id", AuthAdmin, async (req, res) => {
        try {
          let x = await Brands.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
          
            res.status(200).send("brand updated");
        } catch (err) {
            console.log(err);
            res.status(500).send("check the console");
        }
    })
    // delete brand
    .delete("/delete-brand/:id", AuthAdmin, async (req, res) => {
        try {
            let brand = await Brands.findByIdAndDelete(req.params.id);
            console.log(brand)
            res.status(200).send("brand deleted");
        } catch (err) {
            console.log(err);
            res.status(500).send("check the console");
        }
    });

module.exports = brandsRouter;