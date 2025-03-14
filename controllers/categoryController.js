const prisma = require("../utils/prisma");

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });
  try {
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ message: "Category already exists" });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createCategory, listCategories };
