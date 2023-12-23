const mongoose = require("mongoose");
const validator= require("validator");


const brandsSchema = new mongoose.Schema(
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
            type: String,
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

const Brands = mongoose.model("Brands", brandsSchema);
module.exports = Brands;