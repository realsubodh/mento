const express = require("express");
const authMiddleware = require("../authMiddleware");
const Folder = require("../models/folder");
const Bookmark = require("../models/bookmark");
const router = express.Router();

// Creating bookmarks with folder name instead of ID
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { url, title, folderName } = req.body;
    const userId = req.userId;

    if (!url || !folderName) {
      return res.status(400).json({
        msg: "url and folderName is required!",
      });
    }

    // Find folder by name and user
    const folder = await Folder.findOne({ name: folderName, user: userId });
    if (!folder) {
      return res.status(404).json({ msg: "Folder not found!" }); 
    }

    // Create bookmark
    const newBookmark = new Bookmark({
      url,
      title: title || "", // optional title
      folder: folder._id,
      user: userId,
    });

    await newBookmark.save();

    res.status(200).json({
      msg: "Bookmark created successfully!",
      bookmark: newBookmark,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Failed to create bookmark!",
      error: error.message,
    });
  }
});

// Get all bookmarks for a folder (still using folderId for internal access)
router.get("/folder/:folderId", authMiddleware, async (req, res) => {
  try {
    const folderId = req.params.folderId;
    const userId = req.userId;

    // Check folder ownership
    const folder = await Folder.findOne({ _id: folderId, user: userId });
    if (!folder) {
      return res.status(404).json({ msg: "Folder not found!" });
    }

    // Fetch bookmarks
    const bookmarks = await Bookmark.find({ folder: folderId, user: userId });

    res.status(200).json({ bookmarks });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch bookmarks", error: error.message });
  }
});

// Delete a bookmark
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const userId = req.userId;

    // Find and verify bookmark ownership
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

// GET all bookmarks of the logged-in user sorted by creation time
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const bookmarks = await Bookmark.find({ user: userId })
      .sort({ createdAt: -1 }); // DESC order = newest first

    res.status(200).json({ bookmarks });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch all bookmarks", error: error.message });
  }
});


module.exports = router;



// what happening in adding bookmark 
/* 
 frontend sends a folder name
 backend finds the folder using that name
 and uses its _id to store the bookmark
*/