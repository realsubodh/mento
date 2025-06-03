const express = require("express");
const authMiddleware = require("../authMiddleware");
const Folder = require("../models/folder");
const router = express.Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const folders = await Folder.find({ user: req.userId });
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch folders",
      error: error.message,
    });
  }
});

// creating a new custom folder
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        msg: "Folder name is required!",
      });
    }
    const newFolder = await Folder.create({
      name,
      user: req.userId,
      isDefault: false,
    });
    res.status(200).json({
      msg: "folder created successfully!",
      folder: newFolder,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "failed to create folder!",
      error: error.message,
    });
  }
});

// updating existing folder name
router.put("/:id", authMiddleware, async (req, res, next) => {
  // :id comes from the MongoDb base
  try {
    const { name } = req.body;
    const folder = await Folder.findOne({
      _id: req.params.id, // req.params.id used to read the url parameters
      user: req.userId,
    });
    if (!folder) {
      res.status(400).json({ msg: "folder not found!" });
    }

    if (name) folder.name = name;

    await folder.save();
    res.status(200).json("Folder name updated!!");
  } catch (error) {
    res.status(500).json("Unable to update the folder name.");
  }
});

// deletion of folders
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      user: req.userId,
    });
    if (!folder) {
      return res.status(400).json({ msg: "folder not found." });
    }
    if (folder.isDefault) {
      return res.status(403).json("Default folders cannot be deleted.");
    }
    await folder.deleteOne();
    res.status(200).json({ msg: "Folder deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to delete folder.", error: error.message });
  }
});


module.exports = router;
