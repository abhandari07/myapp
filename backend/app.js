require('dotenv').config({ path: '../.env' });
const express = require('express');
const db = require('./models');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use('/api',routes);

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('quizapp', 'quizapp', 'quizapp137##N', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

(async () => {
  try {
    // Disable foreign key checks
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    await db.User.sync({ });
    await db.Quiz.sync({ });
    await db.Question.sync({  });
    await db.Option.sync({ });
    await db.Response.sync({ });
    await db.ParticipantQuiz.sync({ });

    // Enable foreign key checks
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Database tables created successfully');

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error creating database tables:', err);
  }
})();

