const UserModel = require("../models/userModel");
const VerificationModel = require("../models/verificationModel");
const sendVerificationMail = require("../utils/sendverification");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const signUp = async (req, res) => {
  const { username, email, regno, password, confirmpassword } = req.body;
  console.log(req.body);
  try {
    if (!username || !email || !regno || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userAvailable = await UserModel.findOne({
      email,
    });

    console.log("userAvailable", userAvailable);

    if (userAvailable && !userAvailable.verified) {
      return res.status(400).json({
        message:
          "account already created and otp is also sent but not verified.Try again after 15mins",
      });
    }
    if (userAvailable && userAvailable.verified) {
      return res.status(400).json({
        message: "An account with this email already exists and is verified.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password: ", hashedPassword);
    const newUser = new UserModel({
      username: username,
      email: email,
      regno: regno,
      password: hashedPassword,
      verified: false,
      roundOne: false,
      roundTwo: false,
      roundThree: false,
    });
    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(500).json({ message: "Failed to save user" });
    }

    await sendVerificationMail(savedUser);

    const token = jwt.sign(
      {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        regno: savedUser.regno,
        verified: savedUser.verified,
        roundOne: savedUser.roundOne,
        roundTwo: savedUser.roundTwo,
        roundThree: savedUser.roundThree,
        admin: savedUser.admin,
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );

    console.log(`User created ${savedUser}`);
    console.log(`User token ${token}`);

    const userToDelete = await VerificationModel.findOne({ email: email });
    if (!userToDelete.verified && Date.now() > userToDelete.expiresAt) {
      await UserModel.deleteOne({ _id: userToDelete._id });
      console.log(`Deleted unverified user: ${userToDelete.email}`);
    }

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { id } = req.params;
    const { otp, email } = req.body;
    if (!id || !otp) {
      res.status(200).json({ message: "Invalid token otp or email" });
    } else {
      const user = await VerificationModel.findOne({
        user_id: id,
        email: email,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found 1." });
      } else {
        const { expiresAt } = user;
        const hashedOTP = user.otp;
        console.log(hashedOTP, user);

        if (expiresAt < Date.now()) {
          await VerificationModel.deleteMany({ user_id: id });

          throw new Error("Code has expired. please req again ");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            throw new Error("Invalid please check inbox for latest otp");
          } else {
            await UserModel.updateOne({ _id: id }, { verified: true });
            await VerificationModel.deleteMany({ user_id: id });
            res.status(200).json({ message: "verified" });
          }
        }
      }

      console.log("user", user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    if (!id || !email) {
      throw Error("Empty user missing");
    } else {
      const user = await VerificationModel.findOne({
        user_id: id,
        email: email,
      });
      if (!user.verified) {
        await VerificationModel.deleteMany({ id });
        await sendVerificationMail(savedUser);
        res.status(200).json({ message: "sent otp again" });
      } else {
        res.status(200).json({ message: "Already verified" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });

    if (user && user.verified) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.send(400).json("Wrong password");
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
            email: user.email,
            regno: user.regno,
            verified: user.verified,
            roundOne: user.roundOne,
            roundTwo: user.roundTwo,
            roundThree: user.roundThree,
            admin: user.admin,
          },
          process.env.ACCESS_TOKEN_SECERT,
          { expiresIn: "20min" }
        );

        console.log(`User created login : ${user}`);
        console.log(`User token login: ${token}`);
        res.status(200).json({ token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "User is not authorized or token missing" });
  }

  token = authHeader.split(" ")[1];

  if (!refreshToken) {
    return res.status(400).json({ message: "refreshToken is required." });
  }
  try {
    const user = await UserModel.findOne({ refreshToken: refreshToken });
    console.log("user refresh:", user);
    if (!user) {
      return res.status(404).json({ message: "Invalid refreshToken" });
    }
    const storeRefeshToken = user.refreshToken;
    if (!storeRefeshToken) {
      return res.status(400).json({ message: "Invalid refrsh token" });
    }
    user.tokenVersion += 1;
    await user.save();
    const newAccessToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
        regno: user.regno,
        verified: user.verified,
        roundOne: user.roundOne,
        roundTwo: user.roundTwo,
        roundThree: user.roundThree,
        admin: user.admin,
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "45m" }
    );
    res.header("Authorization", `Bearer ${newAccessToken}`);
    res.status(200).json({ accessToken: newAccessToken });
    user.prevAccessToken.push(token);
    await user.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signUp, verifyOTP, resendOTP, login, refreshToken };
