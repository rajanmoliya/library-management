const express = require("express");
const {
  addBook,
  deleteBook,
  updateBookCategories,
} = require("../controllers/bookController");
const { authenticate, authorize } = require("../middlewares/auth");

const router = express.Router();

router.post("/", authenticate, authorize(["ADMIN"]), addBook);
router.delete("/:bookId", authenticate, authorize(["ADMIN"]), deleteBook);
router.put(
  "/:bookId/categories",
  authenticate,
  authorize(["ADMIN"]),
  updateBookCategories
);

module.exports = router;
