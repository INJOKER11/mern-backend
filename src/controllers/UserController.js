import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      imgUrl: req.body.imgUrl,
      hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    );

    const userData = user.toObject();
    delete userData.passwordHash;

    res.json({
      ...userData,
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: "Login or password incorrect" });
    }
    const userData = user.toObject();
    const isValidPass = await bcrypt.compare(
      req.body.password,
      userData.passwordHash,
    );

    if (!isValidPass) {
      return res.status(401).json({
        message: "Login or password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: userData._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    );

    delete userData.passwordHash;

    res.json({
      ...userData,
      token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Failed to login",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userData = user.toObject();
    delete userData.passwordHash;

    res.json({
      ...userData,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
