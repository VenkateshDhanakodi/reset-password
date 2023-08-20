import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpLogin from './Components/SignUpLogin';
import MentorDashboard from './Components/MentorDashboard';
import StudentDashboard from './Components/StudentDashboard';
import CreateStudent from './Components/CreateStudent';
import CreateMentor from './Components/CreateMentor';
import SideBar from './Components/SideBar';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import ForgetPassword from './Components/ForgetPassword';
import ResetPasswordPage from './Components/ResetPasswordPage';
import './App.css';

export const port = 'https://reset-password-iwly.onrender.com';

function App() {
  return (
    <div id='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUpLogin />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/logIn' element={<LogIn />} />
          <Route path='/forgotPassword' element={<ForgetPassword />} />
          <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
          <Route path='/dashboard/*' element={<DashboardRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function DashboardRoutes() {
  return (
    <>
      <SideBar />
      <Routes>
      <Route path="mentor-dashboard" element={<MentorDashboard />} />
      <Route path="student-dashboard" element={<StudentDashboard />} />
      <Route path='create-student' element={<CreateStudent />} />
      <Route path='create-mentor' element={<CreateMentor />} />
      </Routes>
    </>
  );
}

export default App;
