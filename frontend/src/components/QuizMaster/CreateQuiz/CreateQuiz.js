import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import './CreateQuiz.css';
import { createQuiz } from '../../../api';
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({ title: '', description: '', access_code: '', questions: [{ question_text: '', type: '', time_limit: '', options: [{ option_text: '', is_correct: false }] }] });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleQuizChange = (event) => {
    setQuiz({ ...quiz, [event.target.name]: event.target.value });
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  
  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...quiz.questions];
    if (event.target.name === 'is_correct') {
      newQuestions[questionIndex].options[optionIndex][event.target.name] = event.target.checked;
    } else {
      newQuestions[questionIndex].options[optionIndex][event.target.name] = event.target.value;
    }
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleAddQuestion = () => {
    setQuiz({ ...quiz, questions: [...quiz.questions, { question_text: '', type: '', time_limit: '', options: [{ option_text: '', is_correct: false }] }] });
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].options.push({ option_text: '', is_correct: false });
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createQuiz({
        quiz
      })
      setSuccessMessage("Quiz Created Successfully");
      setTimeout(() => {
        navigate("/myquiz");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form className="form-control-create-quiz" onSubmit={handleSubmit}>
      <TextField label="Title" name="title" value={quiz.title} onChange={handleQuizChange} fullWidth />
      <TextField label="Description" name="description" value={quiz.description} onChange={handleQuizChange} fullWidth />
      <TextField label="Access Code" name="access_code" value={quiz.access_code} onChange={handleQuizChange} fullWidth />
      {quiz.questions.map((question, questionIndex) => (
        <div className="question-container" key={questionIndex}>
          <TextField label="Question Text" name="question_text" value={question.question_text} onChange={event => handleQuestionChange(questionIndex, event)} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={question.type} onChange={event => handleQuestionChange(questionIndex, event)}>
              <MenuItem value="multi-selection">Multi-Selection</MenuItem>
              <MenuItem value="true-false">True/False</MenuItem>
              <MenuItem value="matching">Matching</MenuItem>
              <MenuItem value="free-input">Free Input</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Time Limit" name="time_limit" value={question.time_limit} onChange={event => handleQuestionChange(questionIndex, event)} fullWidth />
          {question.options.map((option, optionIndex) => (
            <div className="option-container" key={optionIndex}>
              <TextField label="Option Text" name="option_text" value={option.option_text} onChange={event => handleOptionChange(questionIndex, optionIndex, event)} fullWidth />
              <FormControlLabel control={<Checkbox name="is_correct" checked={option.is_correct} onChange={event => handleOptionChange(questionIndex, optionIndex, event)} />} label="Correct Answer" />
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={() => handleAddOption(questionIndex)}>Add Option</Button>
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddQuestion}>Add Question</Button>
      &nbsp;
      <Button variant="contained" color="secondary" type="submit">Create Quiz</Button>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
    </form>
  );
}

export default CreateQuiz;
