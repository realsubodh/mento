const mongoose = require("mongoose")

const folderSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    icon:{
        type:String
    },
    isDefault:{
        type: Boolean,
        default: false
    },
    user:{
        type:mongoose.Schema.ObjectId, ref:"User", required: true
    },

    // bookmarks saved inside this folder
    bookmarks:[{
        type: mongoose.Schema.ObjectId, ref:"Bookmark"
    }],
}, {timestamps: true})

module.exports = mongoose.model("Folder", folderSchema)