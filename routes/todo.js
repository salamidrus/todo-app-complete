const express = require("express");
const router = express.Router();
const { getAll, view, create, edit, destroy } = require("../controllers/todo");
const { isAuthenticated } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

router.get("/", getAll);
router.get("/:id", view);
router.post("/", isAuthenticated, upload.array('photos', 5),create);
router.put("/:id", edit);
router.delete("/:id", destroy);

module.exports = router;
