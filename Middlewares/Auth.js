const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const VerfiyToken = async (req, res, next) => {
    const data = req.headers.token;
    if (data == null) {
        return res.status(401).json("Unauthorised");
    } else {        
            jwt.verify(data, process.env.SECRET_KEY, function (error, User) {
                if (error) {
                    return res.status(401).json("Invalid Token");
                } else {
                    req.User = User;
                    next();
                }
            });
    }
};

const AuthAdmin = (req, res, next) => {
    VerfiyToken(req, res, async () => {
        if (req.User.IsAdminRole) {
            next();
        } else {
            return res.status(401).json("You are Unauthorised");
        }
    });
};

const AuthUser = (req, res, next) => {
    
    VerfiyToken(req, res, async () => {
        const user = await User.findById(req.User.id);

        if (user || req.User.IsAdminRole) {
           
                next();
            
        } else {
            return res.status(401).json(" You are Unauthorised");
        }
    });
};

module.exports = { VerfiyToken, AuthAdmin, AuthUser };
