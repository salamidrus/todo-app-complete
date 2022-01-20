const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const upload = require("../middlewares/multer");

router.get("/", userControllers.getAll);
router.get("/:id", userControllers.view);
router.post("/register", upload.single('avatar'),userControllers.register);
router.post("/login", userControllers.login);
router.put("/:id", userControllers.edit);
router.delete("/:id", userControllers.delete);

module.exports = router;
