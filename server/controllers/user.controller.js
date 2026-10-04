import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createAdminToken,
  createRefreshToken,
} from "../utils/user.utils.js";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exist with this email address",
      errors: {
        path: "email",
        msg: "User already exist with this email address",
      },
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 12),
  });

  const accessToken = createAccessToken({
    userId: user._id,
  });
  const refreshToken = createRefreshToken({
    userId: user._id,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken: refreshToken,
  });

  return res.status(200).json({
    message: "User Registered Successfully",
    data: {
      email: user.email,
      name: user.name,
      id: user._id,
    },
    accessToken,
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = createAccessToken({
    userId: user._id,
  });

  const refreshToken = createRefreshToken({
    userId: user._id,
  });

  await userModel.findOneAndUpdate(
    {
      email,
    },
    { refreshToken },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "user loggedIn successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      accessToken,
    },
  });
}

export async function adminLogin(req, res) {
  const { email, password } = req.body;

  if (
    email.trim() === process.env.ADMIN_EMAIL.trim() &&
    password.trim() === process.env.ADMIN_PASSWORD.trim()
  ) {
    const adminToken = createAdminToken({
      email,
    });
    return res.status(200).json({
      message: "admin loggedIn successfully",
      adminToken,
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
}
