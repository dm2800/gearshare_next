import {Schema, model, models} from 'mongoose'; 
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required."],
            match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z\u00F1\u00D10-9._ ]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"] 
        },
        email: {
            type: String,
            required: [true, "Email address is required."],
        },
        image: {
            type: String
        }
        // password: {
        //     type: String,
        //     required: [true, "Password is required"],
        //     minLength: [8, "Password must be at least 8 characters"],
        // },
    },
    { timestamps: true }
);



// UserSchema.virtual("confirmPassword")
//     .get(() => this._confirmPassword)
//     .set((value) => (this._confirmPassword = value));

// UserSchema.pre("validate", function (next) {
//     console.log("in validate");

//     if (this.password !== this.confirmPassword) {
//         this.invalidate("confirmPassword", "Passwords must match.");
//         console.log("Passwords don't match.");
//     }
//     next();
// });

// UserSchema.pre("save", function (next) {
//     console.log("in pre save");

//     try {
//         const hashedPassword = await bcrypt.hash(this.password, 10); 
//         console.log('in hash');
//         this.password = hashedPassword; 
//         next(); 
//     } catch(error) {
//         console.log("error hashing password:", err); 
//         next(error); 
//     }
// });



// only create a new model called User if such a model doesn't already exist
// otherwise, use the existing model. 
// this is important because this route is getting called every time and the connection is established every time from scratch 

const User = models.User || model("User", UserSchema);

module.exports = User;