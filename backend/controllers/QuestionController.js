const { Question } = require('../models');
const jwt = require('jsonwebtoken');

class QuestionController {
  static async createQuestion(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can create questions.' });
      }

      const { type, question_text, time_limit, correct_answer, quiz_id } = req.body;

      const question = await Question.create({
        type,
        question_text,
        time_limit,
        correct_answer,
        quiz_id,
      });

      res.status(201).json(question);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getQuestions(req, res) {
    try {
      const questions = await Question.findAll();
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getQuestion(req, res) {
    try {
      const question = await Question.findByPk(req.params.id);
      res.status(200).json(question);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async updateQuestion(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can update questions.' });
      }

      const { type, question_text, time_limit, correct_answer, quiz_id } = req.body;
      await Question.update({ type, question_text, time_limit, correct_answer, quiz_id }, {
        where: {
          id: req.params.id,
        }
      });

      res.status(200).json({ message: 'Question updated successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async deleteQuestion(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can delete questions.' });
      }

      await Question.destroy({
        where: {
          id: req.params.id,
        }
      });

      res.status(200).json({ message: 'Question deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}

module.exports = QuestionController;
