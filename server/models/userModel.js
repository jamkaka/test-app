const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Question = require("./questionModel");
const Test = require("./testModel");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords are not the same!"
    }
  },
  settings: {
    noOfQuestionsInDefaultTest: {
      type: Number
    }
  }
});

// assigns createdAt and updatedAt
userSchema.set("timestamps", true);

userSchema.pre("save", async function(next) {
  this.confirmPassword = undefined;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre("remove", async function(next) {
  // just use mongoose methods to delete questions and tests
  await Question.findManyAndRemove({
    author: this._id
  });
  await Test.findManyAndRemove({
    author: this._id
  });
  next();
});

userSchema.methods.checkPassword = async function(candidatePass) {
  return await bcrypt.compare(candidatePass, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
