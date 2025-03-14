const prisma = require("../utils/prisma");

const addBook = async (req, res) => {
  const { title, authorId, categoryIds } = req.body;
  if (!title || !authorId) {
    return res.status(400).json({ message: "Title and authorId are required" });
  }
  try {
    const book = await prisma.book.create({
      data: {
        title,
        authorId,
        categories: categoryIds
          ? { connect: categoryIds.map((id) => ({ id })) }
          : undefined,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  try {
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) return res.status(404).json({ message: "Book not found" });
    await prisma.book.delete({ where: { id: bookId } });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateBookCategories = async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const { categoryIds } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: bookId },
      data: {
        categories: {
          set: categoryIds.map((id) => ({ id })),
        },
      },
    });
    res
      .status(201)
      .json({ message: "Book categories updated successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addBook, deleteBook, updateBookCategories };
