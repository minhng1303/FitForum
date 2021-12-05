const questionDao = require("../models/question.model");
const Question = require("../models/question.model");
const Attempt = require("../models/attempt.model");
const questionService = {};

questionService.getAllQuestions = async (req, res) => {
  const questions = await questionDao.find({});
  res
    .status(200)
    .json({ questions: questions, questionCount: questions.length });
};

questionService.startAttempt = async (req, res) => {
  let correctAnswers = {};
  let questionArray = await Question.aggregate([{ $sample: { size: 10 } }]);
  questionArray = questionArray.map((doc) => {
    correctAnswers[doc._id] = doc.correctAnswer;
    delete doc.correctAnswer;
    return doc;
  });
  if (!questionArray) {
    return res
      .status(500)
      .json({ message: "The quiz is not available! Please try again" });
  }
  // console.log(questionArray.length);
  let attemptResponse = new Attempt({
    questions: questionArray,
    startedAt: new Date(),
    completed: false,
    correctAnswers: correctAnswers,
  });
  const result = await attemptResponse.save();
  if (!result) {
    return res
      .status(500)
      .json({ message: "The quiz is not available right now!" });
  }
  const { _id, completed, createdAt, score } = result;
  res
    .status(201)
    .json({ questions: questionArray, completed, createdAt, score, _id });
};

module.exports = questionService;
