const { Option } = require('../models');
const jwt = require('jsonwebtoken');

class OptionController {
  static async createOption(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can create options.' });
      }

      const { option_text, question_id } = req.body;
      const option = await Option.create({
        option_text,
        question_id,
      });

      res.status(201).json(option);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getOptions(req, res) {
    try {
      const options = await Option.findAll();
      res.status(200).json(options);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async getOption(req, res) {
    try {
      const option = await Option.findByPk(req.params.id);
      res.status(200).json(option);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async updateOption(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can update options.' });
      }

      const { option_text, question_id } = req.body;
      await Option.update({ option_text, question_id }, {
        where: {
          id: req.params.id,
        }
      });

      res.status(200).json({ message: 'Option updated successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async deleteOption(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can delete options.' });
      }

      await Option.destroy({
        where: {
          id: req.params.id,
        }
      });

      res.status(200).json({ message: 'Option deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}

module.exports = OptionController;
