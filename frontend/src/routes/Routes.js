import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../components/Landing/Landing';
import Login from '../components/Auth/Login/Login';
import Register from '../components/Auth/Register/Register';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add additional routes here */}
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
