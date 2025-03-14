const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const prisma = require("../utils/prisma");

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, role: "USER" },
    });
    const token = generateToken(user);
    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ message: "Username already exists" });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { register, login };
