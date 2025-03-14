const prisma = require("../utils/prisma");

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, role: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const borrowBook = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);
  if (req.user.id !== userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) return res.status(404).json({ message: "Book not found" });

    const activeBorrow = await prisma.borrowedBook.findFirst({
      where: { bookId, returnedAt: null },
    });
    if (activeBorrow)
      return res.status(400).json({ message: "Book is already borrowed" });

    await prisma.borrowedBook.create({
      data: { userId, bookId, borrowedAt: new Date() },
    });
    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const returnBook = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const bookId = parseInt(req.params.bookId);
  if (req.user.id !== userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    const borrowRecord = await prisma.borrowedBook.findFirst({
      where: { userId, bookId, returnedAt: null },
    });
    if (!borrowRecord) {
      return res.status(400).json({ message: "No active borrow record found" });
    }
    await prisma.borrowedBook.update({
      where: { id: borrowRecord.id },
      data: { returnedAt: new Date() },
    });
    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getProfile, borrowBook, returnBook };
