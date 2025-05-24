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

// Get all bookmarks for a folder
router.get("/folder/:folderId", authMiddleware, async (req, res) => {
    try {
      const folderId = req.params.folderId;
      const userId = req.userId;
  
      // check if folder belongs to user
      const folder = await Folder.findOne({ _id: folderId, user: userId });
      if (!folder) {
        return res.status(404).json({ msg: "Folder not found!" });
      }
  
      // find bookmarks in that folder
      const bookmarks = await Bookmark.find({ folder: folderId, user: userId });
  
      res.status(200).json({ bookmarks });
    } catch (error) {
      res.status(500).json({ msg: "Failed to fetch bookmarks", error: error.message });
    }
  });

  // deleting bookmark
  router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      const bookmarkId = req.params.id;
      const userId = req.userId;
  
      // Find the bookmark and make sure it belongs to the user
      const bookmark = await Bookmark.findOne({ _id: bookmarkId, user: userId });
      if (!bookmark) {
        return res.status(404).json({ msg: "Bookmark not found or unauthorized" });
      }
  
      await Bookmark.deleteOne({ _id: bookmarkId });
      res.status(200).json({ msg: "Bookmark deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Failed to delete bookmark", error: error.message });
    }
  });

module.exports = router
