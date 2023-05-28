import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../components/Landing/Landing';
import Login from '../components/Auth/Login/Login';
import Register from '../components/Auth/Register/Register';
import CreateQuiz from '../components/QuizMaster/CreateQuiz/CreateQuiz';
import MyQuiz from '../components/QuizMaster/MyQuiz/MyQuiz';
import UpdateQuiz from '../components/QuizMaster/UpdateQuiz/UpdateQuiz';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/myquiz" element={<MyQuiz />} />
        <Route path="/update-quiz/:quizId" element={<UpdateQuiz />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
