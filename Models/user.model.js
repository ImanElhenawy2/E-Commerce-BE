const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        IsAdminRole: {
            type: Boolean,
            default: false,
        },
        FirstName: {
            type: String,
            trim: true,
            required: true,
            toLowerCase: true,
        },
        LastName: {
            type: String,
            trim: true,
            required: true,
            toLowerCase: true,
        },
        UserName: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            toLowerCase: true,
        },
        Password: {
            type: String,
            minlength: 8,
            trim: true,
            required: true,
        },
        Email: {
            type: String,
            trim: true,
            required: true,
            validate(value) {
                if (!validator.isEmail(value)) throw new Error("Invalid email");
            },
        },
        Gender: {
            type: String,
            default: "Mr",
        },
        IsActive: {
            type: Boolean,
            default: false,
        },
        NumberOfLoginTimes: {
            type: Number,
        }
    },
    { timestamps: true }
);

//userSchema.pre("save", async function (next) {
//    try {
//        //const salt = bcrypt.genSaltSync(10);
//        const hashData = bcrypt.hashSync(this.Password, 10);
//        this.Password = hashData;
//        next();
//    } catch (e) {
//        next(e);
//    }
//});

//userSchema.pre('save', function(next) {
//    var user = this;
//
//    // only hash the password if it has been modified (or is new)
//    if (!user.isModified('password')) return next();
//
//    // generate a salt
//    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//        if (err) return next(err);
//
//        // hash the password using our new salt
//        bcrypt.hash(user.Password, salt, function(err, hash) {
//            if (err) return next(err);
//            // override the cleartext password with the hashed one
//            user.Password = hash;
//            next();
//        });
//    });
//});
//
//userSchema.pre('save', async function save(next) {
//    if (!this.isModified('password')) return next();
//    try {
//      const salt = await bcrypt.genSalt(10);
//      this.password = await bcrypt.hash(this.password, salt);
//      return next();
//    } catch (err) {
//      return next(err);
//    }
//  });


const User = mongoose.model("User", userSchema);
module.exports = User;
