const router = require("express").Router();
const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthUser, AuthAdmin } = require("../Middlewares/Auth");

// register

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        let user = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password: hashedPassword,
        });
        await user.save();

        res.status(200).send({
            responseCode: "SUCCESS",
            message: "Registerd successfully",
        });
    } catch (e) {
        res.status(500).send({
            responseCode: "FAILED",
            data: e.message,
            message: "error adding user Data",
        });
    }
});
router.post("/registerAdmin", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        let user = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password: hashedPassword,
            IsAdminRole: true,
        });
        await user.save();

        res.status(200).send({
            responseCode: "SUCCESS",
            message: "Registerd successfully",
        });
    } catch (e) {
        res.status(500).send({
            responseCode: "FAILED",
            data: e.message,
            message: "error adding user Data",
        });
    }
});

// login

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });

        if (!user) throw new Error("Wrong Email");
        //const isCorrect = req.body.Password === user.Password

        const isCorrect = await bcrypt.compare(
            req.body.Password,
            user.Password,
        );

        if (!isCorrect) throw new Error("Wrong password");
        user.IsActive = true;
        let x = await User.findByIdAndUpdate(
            user.id,
            { $set: user },
            { new: true, runValidators: true }
        );
        await x.save();

        const { Password, IsAdminRole, ...others } = user._doc;
        const AccessToken = jwt.sign(
            {
                id: user.id,
                IsAdminRole: user.IsAdminRole,
                FirstName: user.FirstName,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "5h",
            }
        );

        res.status(200).send({
            responseCode: "SUCCESS",
            message: "logged in",
            AccessToken,
        });
    } catch (e) {
        res.status(500).send({
            responseCode: "FAILED",
            data: e.message,
            message: "invalid data",
        });
    }
});

// logout

router.post("/logout", async (req, res) => {
    console.log(req.body.id);
    const user = await User.findById(req.body.id);

    user.IsActive = false;
    const isLoggedOut = await User.findByIdAndUpdate(
        user.id,
        { $set: user },
        { new: true, runValidators: true }
    );
    isLoggedOut
        ? res.status(200).send({
              responseCode: "SUCCESS",
              message: "logged out",
          })
        : res.status(500).send({
              responseCode: "FAILED",
              data: e.message,
          });
});

// add user
    router.get("/user", AuthAdmin, async (req, res) => {
        try {
            let users = await User.find();
            res.status(200).send(users);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    router.get("/user/:id", AuthAdmin, async (req, res) => {
        try {
            const userId = req.params.id;
            let user = await User.findById(userId);
            res.status(200).send({ user: user });
        } catch (e) {
            console.log(e);
            res.status(500).send("error");
        }
    })
    router.post("/add-user", AuthAdmin, async (req, res) => {
        try {
            const users = await User.insertMany(req.body);

            res.status(200).send(users);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: "error while processing your request",
            });
        }
    })
    router.put("/update-user/:id", AuthAdmin, async (req, res) => {
        try {
          let x = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
          
            res.status(200).send("User data updated");
        } catch (err) {
            console.log(err);
            res.status(500).send("check the console");
        }
    })
    router.delete("/delete-user/:id", AuthAdmin, async (req, res) => {
        try {
            let user = await User.findByIdAndDelete(req.params.id);
            res.status(200).send("User deleted");
        } catch (err) {
            console.log(err);
            res.status(500).send("check the console");
        }
    });


module.exports = router;
