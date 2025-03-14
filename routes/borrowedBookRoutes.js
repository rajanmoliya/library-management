const express = require("express");
const { getBorrowHistory } = require("../controllers/borrowedBookController");
const { authenticate, authorize } = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/books/:bookId/borrow-history",
  authenticate,
  authorize(["ADMIN"]),
  getBorrowHistory
);

module.exports = router;
