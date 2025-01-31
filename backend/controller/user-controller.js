import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name === "" || email === "" || password === "") {
      return res
        .status(400)
        .json({ message: "Something wrong", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "Account creted successfully.", success: true });
  } catch (error) {
    console.log("Error during registration:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      return res
        .status(400)
        .json({ message: "Something wrong", success: false });
    }

    const userData = await User.findOne({ email });

    if (!userData) {
      return res
        .status(400)
        .json({ message: "User doen't not exist", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "incorrect email or password", success: false });
    }

    const tokenData = {
      id: userData._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const user = {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
    };

    return res.status(201).json({
      message: "User login successfully.",
      user,
      token,
      success: true,
    });
  } catch (error) {
    console.log("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
