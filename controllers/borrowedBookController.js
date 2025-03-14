const prisma = require("../utils/prisma");

const getBorrowHistory = async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  try {
    const borrowHistory = await prisma.borrowedBook.findMany({
      where: { bookId },
      include: { user: true },
    });
    res.json(borrowHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getBorrowHistory };
