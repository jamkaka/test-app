const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

exports.register = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({
      status: "success",
      data: {
        token
      }
    });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      res.status(422).json({
        status: "error",
        data: {
          message: "That email is taken!"
        }
      });
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const candidateUser = await User.findOne({ email });
    if (!candidateUser) {
      return res.status(401).json({
        status: "error",
        data: {
          message: "Wrong email! User may not exist!"
        }
      });
    }
    const isPasswordCorrect = await candidateUser.checkPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "error",
        data: {
          message: "Wrong password!"
        }
      });
    }
    const token = jwt.sign({ id: candidateUser._id }, process.env.JWT_SECRET);
    res.status(200).json({
      status: "success",
      data: {
        token
      }
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      data: {
        message: "Sth unexpected happened!"
      }
    });
  }
};

exports.protect = (req, res, next) => {
  let candidateToken;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // here we get token.
      candidateToken = req.headers.authorization.split(" ")[1];
    }
    // decode token.
    const userId = jwt.verify(candidateToken, process.env.JWT_SECRET);
    if (!userId) throw Error;
    req.userId = userId.id;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      data: {
        message: "You must login!"
      }
    });
  }
};
