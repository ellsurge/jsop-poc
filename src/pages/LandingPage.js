import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLaunch = (role, path) => {
    toast.info(`Switching to ${role} demo view`);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <img src="/project-logo.jpg" alt="JSOP Logo" className="h-24 w-auto mb-8 rounded shadow-md" />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          JSOP Internship Platform Demo
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Explore the platform from different perspectives. Select a role to begin the demo.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-6xl w-full">
        <Card className="flex flex-col items-center text-center p-8 hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Student</h2>
          <p className="text-gray-600 mb-8 flex-grow">
            Browse internships, apply to companies, and track your application status.
          </p>
          <Button onClick={() => handleLaunch('Student', '/student/dashboard')} className="w-full">
            Launch Student Demo
          </Button>
        </Card>

        <Card className="flex flex-col items-center text-center p-8 hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Company</h2>
          <p className="text-gray-600 mb-8 flex-grow">
            Post new listings, manage internships, and review student applicants.
          </p>
          <Button onClick={() => handleLaunch('Company', '/company/dashboard')} variant="primary" className="w-full bg-green-600 hover:bg-green-700 focus:ring-green-500">
            Launch Company Demo
          </Button>
        </Card>

        <Card className="flex flex-col items-center text-center p-8 hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin</h2>
          <p className="text-gray-600 mb-8 flex-grow">
            Monitor platform activity, approve accounts, and generate system reports.
          </p>
          <Button onClick={() => handleLaunch('Admin', '/admin/dashboard')} variant="primary" className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-purple-500">
            Launch Admin Demo
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
