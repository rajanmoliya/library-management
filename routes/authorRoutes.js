const express = require("express");
const {
  createAuthor,
  listAuthors,
  listBooksByAuthor,
} = require("../controllers/authorController");
const { authenticate, authorize } = require("../middlewares/auth");

const router = express.Router();

router.get("/", authenticate, listAuthors);
router.post("/", authenticate, authorize(["ADMIN"]), createAuthor);
router.get("/:authorId/books", authenticate, listBooksByAuthor);

module.exports = router;
