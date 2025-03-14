const express = require("express");
const {
  getProfile,
  borrowBook,
  returnBook,
} = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", authenticate, getProfile);
router.post(
  "/:userId/borrow/:bookId",
  authenticate,
  authorize(["USER"]),
  borrowBook
);
router.post(
  "/:userId/return/:bookId",
  authenticate,
  authorize(["USER"]),
  returnBook
);

module.exports = router;
