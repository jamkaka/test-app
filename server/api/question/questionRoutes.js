const express = require('express');
const {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('./questionController');

const router = express.Router();

router.route('/').get(getAllQuestions).post(createQuestion);
router.route('/:id').delete(deleteQuestion).patch(updateQuestion);

module.exports = router;
