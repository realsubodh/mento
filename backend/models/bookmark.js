const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema(
  {
    url: { type: String, required: true },
    title: { type: String },
    platform: { type: String }, 
    thumbnail: { type: String }, 
    tags: [{ type: String }], 
    note: { type: String }, 
    savedAt: { type: Date, default: Date.now },

    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
