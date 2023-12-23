const mongoose = require("mongoose");
const validator= require("validator");


const productsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false,
            validate: 
            (value) => {
                return value.length > 2 && value.length < 50;  
            }
        },
        price:{
            type: Number,
            required: true,
        },
        image:{
            type: Array,
            required: false,
        },
        description:{ 
            type: String,
        },
        color:{ 
            type: String
        },
        category: {
            type: Array,
        }

    }
);

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;