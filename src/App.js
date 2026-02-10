import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentInternships from './pages/student/StudentInternships';
import StudentApplications from './pages/student/StudentApplications';
import StudentAccepted from './pages/student/StudentAccepted';

// Company Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyCreateListing from './pages/company/CompanyCreateListing';
import CompanyApplications from './pages/company/CompanyApplications';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminApprovals from './pages/admin/AdminApprovals';
import AdminReports from './pages/admin/AdminReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/internships" element={<StudentInternships />} />
        <Route path="/student/applications" element={<StudentApplications />} />
        <Route path="/student/accepted" element={<StudentAccepted />} />

        {/* Company Routes */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/create" element={<CompanyCreateListing />} />
        <Route path="/company/applications/:id" element={<CompanyApplications />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/approvals" element={<AdminApprovals />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;