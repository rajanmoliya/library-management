const prisma = require("../utils/prisma");

const createAuthor = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const author = await prisma.author.create({ data: { name } });
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const listAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const listBooksByAuthor = async (req, res) => {
  const authorId = parseInt(req.params.authorId);
  try {
    const books = await prisma.book.findMany({ where: { authorId } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createAuthor, listAuthors, listBooksByAuthor };
