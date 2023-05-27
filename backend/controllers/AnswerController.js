const { UserAnswer } = require('../models');

exports.getAllAnswers = async (req, res) => {
  try {
    UserAnswer.sync({ force: false }).then(() => {
      console.log('Answer table created');
    }).catch(err => {
      console.error('Error creating Answer table: ', err);
    });
    const answers = await UserAnswer.findAll();
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving answers' });
  }
};

exports.createAnswer = async (req, res) => {
  try {
    const newAnswer = await UserAnswer.create(req.body);
    res.status(201).json(newAnswer);
  } catch (err) {
    console.error(err); // Log the error to the console for debugging
    res.status(500).json({ error: 'Error creating answer', details: err.message });
  }
};




