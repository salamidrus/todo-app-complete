const express = require("express")
const router = express.Router()
const userRoutes = require("./user")
const todoRoutes = require("./todo")

router.use("/user", userRoutes)
router.use("/todo", todoRoutes)


module.exports = router