const { ParticipantQuiz } = require('../models');
const jwt = require('jsonwebtoken');

class ParticipantQuizController {
  static async createParticipantQuiz(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;

      const { quiz_id } = req.body;

      const participantQuiz = await ParticipantQuiz.create({
        user_id: id,
        quiz_id,
        start_time: new Date(),
      });

      res.status(201).json(participantQuiz);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getParticipantQuizzes(req, res) {
    try {
      const participantQuizzes = await ParticipantQuiz.findAll();
      res.status(200).json(participantQuizzes);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getParticipantQuiz(req, res) {
    try {
      const participantQuiz = await ParticipantQuiz.findByPk(req.params.id);
      res.status(200).json(participantQuiz);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async endParticipantQuiz(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;

      await ParticipantQuiz.update({ end_time: new Date() }, {
        where: {
          id: req.params.id,
          user_id: id,
        }
      });

      res.status(200).json({ message: 'Quiz participation ended successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async deleteParticipantQuiz(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;

      await ParticipantQuiz.destroy({
        where: {
          id: req.params.id,
          user_id: id,
        }
      });

      res.status(200).json({ message: 'Quiz participation deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}

module.exports = ParticipantQuizController;
