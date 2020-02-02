const Question = require("../../models/questionModel");

exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({ author: req.userId });
    if (!questions) throw Error;
    res.status(200).json({
      message: "success",
      data: questions
    });
  } catch (err) {
    res.status(404).json({
      message: "error",
      data: {
        message: "Could not find questions!"
      }
    });
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    const newQuestion = await Question.create({
      ...req.body,
      author: req.userId
    });
    res.status(200).json({
      message: "success",
      data: {
        newQuestion
      }
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
      data: {
        message: "Could not create question!"
      }
    });
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    const queryObj = {
      _id: req.params.id,
      author: req.userId
    };
    const fieldsToEdit = req.body;
    const editedQuestion = await Question.findOneAndUpdate(
      queryObj,
      fieldsToEdit,
      {
        runValidators: true
      }
    );
    if (!editedQuestion) throw Error;
    res.status(204).json({
      message: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      message: "error",
      data: {
        message: `Could not find question with id ${req.params.id}!`
      }
    });
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const queryObj = {
      _id: req.params.id,
      author: req.userId
    };
    // needed to replace findOneAndUpdate for middlewares to run.
    const deletedQuestion = await Question.findOne(queryObj);
    if (!deletedQuestion) throw Error;
    await deletedQuestion.remove();
    await deletedQuestion.save();
    res.status(204).json({
      message: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      message: "error",
      data: {
        message: `Could not find question with id ${req.params.id}!`
      }
    });
  }
};
