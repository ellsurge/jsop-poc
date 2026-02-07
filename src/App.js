import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentDashboard from './pages/student/StudentDashboard';
import CompanyDashboard from './pages/company/CompanyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/student" />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;