const { Quiz } = require('../models');
const { Question } = require('../models');
const { Option } = require('../models');
const jwt = require('jsonwebtoken');
const sequelize  = require('../config/sequelize')

class QuizController {
  static async createQuiz(req, res) {

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
      
  
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can create quizzes.' });
      }
  
      const { title, description, access_code, questions } = req.body.quiz;
      const quiz = await Quiz.create({ title, description, access_code, user_id: id });
  
      for (const question of questions) {
        const createdQuestion = await Question.create({ ...question, quiz_id: quiz.id });
  
        for (const option of question.options) {
          await Option.create({ ...option, question_id: createdQuestion.id });
        }
      }
      // await transaction.commit();
      res.status(201).json({ message: 'Quiz created successfully' });
    } catch (err) {
      // await transaction.rollback();
      res.status(500).json({ error: err  });
    }
  }

  static async getAllQuizOfUser(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;
  
      if (role !== 'quizmaster') {
        return res.status(403).json({ error: 'Only quizmasters can view quizzes.' });
      }


      const quizzes = await Quiz.findAll({
        where: {
          user_id: id
        }
      });
      
      res.status(200).json(quizzes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  static async getQuizById(req, res) {
    try {
      const { quizId } = req.params;
      const quiz = await Quiz.findOne({ 
        where: { id: quizId }, 
        include: [
          {
            model: Question, 
            as: 'questions',
            include: [
              {
                model: Option,
                as: 'options'
              }
            ]
          }
        ]
      });
      res.status(200).json(quiz);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }

  static async updateQuiz(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { title, description, access_code, questions } = req.body;
        const quiz = await Quiz.findByPk(id);

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id: userId, role } = decoded;

        if (role !== 'quizmaster' || quiz.user_id !== userId) {
            return res.status(403).json({ error: 'Only the quizmaster who created the quiz can update it' });
        }
        await Quiz.update({ title, description, access_code }, { where: { id } }, { transaction });

        for (const question of questions) {
            const { id: questionId, question_text, type, time_limit, options } = question;
            await Question.update({ question_text, type, time_limit }, { where: { id: questionId } }, { transaction });

            for (const option of options) {
                const { id: optionId, option_text, is_correct } = option;
                await Option.update({ option_text, is_correct }, { where: { id: optionId } }, { transaction });
            }
        }

        await transaction.commit();
        res.status(200).json({ message: 'Quiz updated successfully' });
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ error: err.message });
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
