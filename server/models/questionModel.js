const mongoose = require("mongoose");
const Test = require("./testModel");

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  answers: {
    type: Array,
    required: true
  },
  correctAnswer: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

questionSchema.pre("remove", async function(next) {
  const docs = await Test.find({
    questions: { $in: { _id: this._id } }
  }).exec();
  await Promise.all(
    docs.map(async test => {
      await test.questions.remove(this._id);
      return test.save();
    })
  );
  next();
});

questionSchema.set("timestamps", true);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
