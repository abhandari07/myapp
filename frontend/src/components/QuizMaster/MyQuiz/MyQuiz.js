import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { getAllQuizOfUser } from '../../../api';
import './MyQuiz.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  table: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const MyQuizzes = () => {
  const classes = useStyles();
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getAllQuizOfUser();
        setQuizzes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchQuizzes();
  }, []);

  const handleViewUpdate = (quizId) => {
    navigate(`/update-quiz/${quizId}`);
  };

  return (
    <Container className={classes.root}>
      <Typography variant='h4' component='h1'>My Quizzes</Typography>
      <Grid item>
        <Button className={classes.button} variant='contained' color='primary' href='/create-quiz'>Add Quiz</Button>
      </Grid>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell>{quiz.title}</TableCell>
                <TableCell>{quiz.description}</TableCell>
                <TableCell>
                  <Button variant='contained' color='primary' onClick={() => handleViewUpdate(quiz.id)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyQuizzes;
