const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const QuizController = require('../controllers/QuizController');
const QuestionController = require('../controllers/QuestionController');
const OptionController = require('../controllers/OptionController');
const ResponseController = require('../controllers/ResponseController');
const ParticipantQuizController = require('../controllers/ParticipantQuizController');

const { authenticate } = require('../middlewares/authenticate');


// User Routes
router.post('/users/register', UserController.registerUser);
router.post('/users/login', (UserController.loginUser));

// Quiz Routes
router.post('/quizzes', authenticate, (QuizController.createQuiz));
router.get('/quizzes', (QuizController.getQuizzes));
router.get('/quizzes/:id', (QuizController.getQuiz));
router.put('/quizzes/:id', authenticate, (QuizController.updateQuiz));
router.delete('/quizzes/:id', authenticate, (QuizController.deleteQuiz));

// Question Routes
router.post('/questions', authenticate, (QuestionController.createQuestion));
router.get('/questions', (QuestionController.getQuestions));
router.get('/questions/:id', (QuestionController.getQuestion));
router.put('/questions/:id', authenticate, (QuestionController.updateQuestion));
router.delete('/questions/:id', authenticate, (QuestionController.deleteQuestion));

// Option Routes
router.post('/options', authenticate, (OptionController.createOption));
router.get('/options', (OptionController.getOptions));
router.get('/options/:id', (OptionController.getOption));
router.put('/options/:id', authenticate, (OptionController.updateOption));
router.delete('/options/:id', authenticate, (OptionController.deleteOption));

// Response Routes
router.post('/responses', authenticate, (ResponseController.createResponse));
router.get('/responses', (ResponseController.getResponses));
router.get('/responses/:id', (ResponseController.getResponse));
router.put('/responses/:id', authenticate, (ResponseController.updateResponse));
router.delete('/responses/:id', authenticate, (ResponseController.deleteResponse));

// ParticipantQuiz Routes
router.post('/participantquizzes', authenticate, (ParticipantQuizController.createParticipantQuiz));
router.get('/participantquizzes', (ParticipantQuizController.getParticipantQuizzes));
router.get('/participantquizzes/:id', (ParticipantQuizController.getParticipantQuiz));
router.put('/participantquizzes/:id/end', authenticate, (ParticipantQuizController.endParticipantQuiz));
router.delete('/participantquizzes/:id', authenticate, (ParticipantQuizController.deleteParticipantQuiz));

module.exports = router;
