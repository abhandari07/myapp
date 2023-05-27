const { Response } = require('../models');
const jwt = require('jsonwebtoken');

class ResponseController {
  static async createResponse(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;

      const { response_text, option_id, question_id, quiz_id } = req.body;
      
      const response = await Response.create({
        user_id: id,
        response_text,
        option_id,
        question_id,
        quiz_id
      });

      res.status(201).json(response);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getResponses(req, res) {
    try {
      const responses = await Response.findAll();
      res.status(200).json(responses);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getResponse(req, res) {
    try {
      const response = await Response.findByPk(req.params.id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async updateResponse(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;

      const { response_text, option_id, question_id, quiz_id } = req.body;
      await Response.update({ response_text, option_id, question_id, quiz_id }, {
        where: {
          id: req.params.id,
          user_id: id,
        }
      });

      res.status(200).json({ message: 'Response updated successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async deleteResponse(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;

      await Response.destroy({
        where: {
          id: req.params.id,
          user_id: id,
        }
      });

      res.status(200).json({ message: 'Response deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}

module.exports = ResponseController;
