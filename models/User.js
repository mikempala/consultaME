const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'patient', 'doctor', 'secretary'],
        require: true,
        default: 'patient'
    },
    profile_pic: {
        type: String,
        default: "https://res.cloudinary.com/consultame/image/upload/v1540517299/img/user-circle.svg"
    },
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    birthday: {
        type: Date,
        require: true
    },
    telephone: {
        type: String,
        minlength: 7,
        maxlength: 10
    },
    address: {
        street: String,
        district: String,
        city: String,
        state: String,
        zip_code: String
    },
    status: {
        type: String,
        enum: ["Pending Confirmation", "Active"],
        default: "Pending Confirmation"
    },
    facebookID: String,
    facebookAccessToken: String,
}, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    });

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' }); // Username Field specified that we're going to use "email" as the "username" for logging in

module.exports = mongoose.model("User", userSchema);