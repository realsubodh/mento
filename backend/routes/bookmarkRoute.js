const express = require("express");
const authMiddleware = require("../authMiddleware");
const Folder = require("../models/folder");
const Bookmark = require("../models/bookmark")
const router = express.Router()

// creating bookmarks
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { url, title, folder: folderId } = req.body;
    const userId = req.userId;

    if (!url || !folderId) {
      return res.status(400).json({
        msg: "url and folderId is required!",
      });
    }

    const folder = await Folder.findOne({ _id: folderId, user: userId });
    if (!folder) {
      return res.status(500).json({ msg: "Folder not found!" });
    }

    // creating the bookmark
    const newBookmark = new Bookmark({
      url,
      title: title || "", // default to empty string if no title provided
      folder: folderId,
      user: userId,
    });

    await newBookmark.save()

    res.status(200).json({msg:"bookmark created successfully!", bookmark: newBookmark})
  } catch (error) {
    res.status(500).json({
        msg:"Failed to create bookmark!",
        error: error.message
    })
  }
});

module.exports = router

/*"msg": "bookmark created successfully!",
    "bookmark": {
        "url": "https://www.x.com/watch?v=dQw4w9WgXcQ",
        "title": "Never Gonna Give You Up",
        "tags": [],
        "folder": "68320878f7ef2251e7f19615",
        "user": "68320877f7ef2251e7f19611",
        "_id": "68320c2f87258d1757341a77",
        "savedAt": "2025-05-24T18:13:03.440Z",
        "createdAt": "2025-05-24T18:13:03.443Z",
        "updatedAt": "2025-05-24T18:13:03.443Z",
        "__v": 0
    } */