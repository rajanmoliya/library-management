const express = require("express");
const {
  createCategory,
  listCategories,
} = require("../controllers/categoryController");
const { authenticate, authorize } = require("../middlewares/auth");

const router = express.Router();

router.get("/", authenticate, listCategories);
router.post("/", authenticate, authorize(["ADMIN"]), createCategory);

module.exports = router;
