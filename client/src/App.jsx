import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MantrasPage from './pages/MantrasPage'; 
import ChatBot from './components/ChatBot';
import BMICalculator from './components/BMICalculator';
import PersonalizedPlan from './pages/PersonalizedPlan';
import Appointment from './pages/Appointment';
import BMRPage from './pages/BMRPage'; 
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/mantras" element={<MantrasPage />} />
          <Route path="/Chatbot" element={<ChatBot />} /> 
          <Route path="/personalized-plan" element={<PersonalizedPlan />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/bmr" element={<BMRPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
