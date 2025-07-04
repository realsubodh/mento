const express = require("express")
const userRouter = require("./userRoute")
const folderRouter = require("./folderRoute")
const bookmarkRouter = require("./bookmarkRoute")
const router = express.Router()

router.use("/user", userRouter)
router.use("/folder", folderRouter)
router.use("/bookmark", bookmarkRouter)

module.exports = router
