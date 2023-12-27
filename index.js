const express = require("express");
const cors = require("cors");
const dotenv = require ("dotenv");
dotenv.config({path: "config.env"});
const app = express();
require("./database")

app.use(cors());
app.use(express.json());

const userRouter = require("./Routes/userRouter");
const productsRouter = require("./Routes/productsRouter");
const brandsRouter = require("./Routes/brandsRouter");

// use Routes
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/brands", brandsRouter);



//app.all("*", (req, res, next) => {
//next(new ApiError(`This Route not found: ${req.originalUrl}`, 400));
//});

// Global error handlig middleware
//app.use(globalErrorHandle);



const PORT = process.env.PORT || "http://ecommerce.onrender.com";
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))