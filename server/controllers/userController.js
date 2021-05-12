import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUSer = await User.findOne({ email });

    if (!existingUSer) return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUSer.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ email: existingUSer.email, id: existingUSer._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: existingUSer, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUSer = await User.findOne({ email });

    if (existingUSer) return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName}, ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
