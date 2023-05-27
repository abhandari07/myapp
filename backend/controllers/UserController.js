const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password_hash, role });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error });
  }
};


const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, username: user.username, email: user.email });
  } catch (error) {
    console.error('Error logging in:', error.stack); // Add this line to log the error stack trace
    res.status(500).json({ message: 'Error logging in.', error });
  }
};





const getAllUsers = async (req, res) => {
  try {
    User.sync({ force: false }).then(() => {
      console.log('User table created');
    }).catch(err => {
      console.error('Error creating User table: ', err);
    });
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    // res.status(500).json({ error: 'Error creating user' });
   res.json({
    err
   })
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving user' });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const [updatedRowsCount] = await User.update(req.body, { where: { id: id } });

    if (updatedRowsCount) {
      const updatedUser = await User.findByPk(id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'score'],
      order: [['score', 'DESC']],
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving leaderboard' });
  }
};




module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  createUser,
  getUserById,
  updateUserById,
  getLeaderboard
};

