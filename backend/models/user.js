const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },

    // every user can have multiple folders
    folders:[{
        type: mongoose.Schema.Types.ObjectId, ref:"Folder"
    }]
  });

const User = mongoose.model("User", userSchema)
module.exports = User
