const { Quiz } = require('../models');
const jwt = require('jsonwebtoken');

class QuizController {
  static async createQuiz(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can create quizzes.' });
      }

      const { title, description } = req.body;
      const quiz = await Quiz.create({
        title,
        description,
        user_id: id,
        access_code: Math.random().toString(36).substring(2, 15) // Simple random string for demo purposes.
      });

      res.status(201).json(quiz);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getQuizzes(req, res) {
    try {
      const quizzes = await Quiz.findAll();
      res.status(200).json(quizzes);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getQuiz(req, res) {
    try {
      const quiz = await Quiz.findByPk(req.params.id);
      res.status(200).json(quiz);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async updateQuiz(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can update quizzes.' });
      }

      const { title, description } = req.body;
      await Quiz.update({ title, description }, {
        where: {
          id: req.params.id,
          user_id: id
        }
      });

      res.status(200).json({ message: 'Quiz updated successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async deleteQuiz(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can delete quizzes.' });
      }

      await Quiz.destroy({
        where: {
          id: req.params.id,
          user_id: id
        }
      });

      res.status(200).json({ message: 'Quiz deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}

module.exports = QuizController;
