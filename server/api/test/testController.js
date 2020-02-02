const Test = require("../../models/testModel");
const Question = require("../../models/questionModel");
const handlerHelpers = require("./../../utils/handlerHelpers");

exports.getAllTests = async (req, res, next) => {
  try {
    const tests = await Test.find({ author: req.userId });
    res.status(200).json({
      message: "success",
      data: tests
    });
  } catch (err) {
    res.status(404).json({
      message: "error",
      data: {
        message: "Could not find tests!"
      }
    });
  }
};

exports.getAllPublicTests = (req, res, next) => {
  const queryObj = { isPublic: true };
  handlerHelpers.getAll(res, Test, queryObj, ["name", "isForkable"]);
};

exports.getOnePublicTest = (req, res, next) => {
  const queryObj = { _id: req.params.id, isPublic: true };
  handlerHelpers.getOne(
    res,
    Test,
    queryObj,
    ["questions"],
    [{ path: "author", select: "email" }]
  );
};

exports.forkTest = async (req, res, next) => {
  try {
    const forkedTest = await Test.findOne({
      isPublic: true,
      isForkable: true,
      _id: req.params.id
    });
    if (!forkedTest) throw Error("Could not find public test!");
    if (!forkedTest.questions.length)
      throw Error("Test you want to fork has no questions.");
    const forkedQuestions = await Promise.all(
      forkedTest.questions.map(async questionId => {
        const forkedQuestion = await Question.findById(questionId);
        const newQuestion = await Question.create({
          title: forkedQuestion.title,
          answers: forkedQuestion.answers,
          correctAnswer: 0,
          author: req.userId
        });
        return newQuestion._id;
      })
    );
    req.body = {
      questions: forkedQuestions,
      name: forkedTest.name
    };
    next();
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.name,
      data: null
    });
  }
};

exports.createTest = async (req, res, next) => {
  try {
    const newTest = await Test.create({
      ...req.body,
      author: req.userId
    });
    res.status(200).json({
      message: "success",
      data: {
        newTest
      }
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
      data: {
        message: "Could not create test!"
      }
    });
  }
};

exports.updateTest = async (req, res, next) => {
  try {
    const fieldsToEdit = req.body.testData;
    const queryObj = {
      _id: req.params.id,
      author: req.userId
    };
    await Test.findOneAndUpdate(queryObj, fieldsToEdit, {
      runValidators: true
    });
    res.status(204).json({
      message: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      message: "error",
      data: {
        message: `Could not find test with id ${req.params.id}!`
      }
    });
  }
};

exports.deleteTest = async (req, res, next) => {
  try {
    const queryObj = {
      _id: req.params.id,
      author: req.userId
    };
    await Test.findOneAndDelete(queryObj);
    res.status(204).json({
      message: "success",
      data: null
    });
  } catch (err) {
    res.status(404).json({
      message: "error",
      data: {
        message: `Could not find test with id ${req.params.id}!`
      }
    });
  }
};
