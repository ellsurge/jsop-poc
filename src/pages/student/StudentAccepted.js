import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import StatusBadge from '../../components/shared/StatusBadge';
import { FaUserTie, FaEnvelope, FaPhone, FaCheckSquare, FaRegSquare, FaDownload, FaCertificate } from 'react-icons/fa';

import applicationData from '../../data/applications.json';
import internshipData from '../../data/internships.json';
import companyData from '../../data/companies.json';

// Helper functions
const getInternship = (id) => internshipData.find(i => i.id === id);
const getCompany = (id) => companyData.find(c => c.id === id);

const StudentAccepted = () => {
  // Find the first accepted application for demo purposes
  const acceptedApp = applicationData.find(app => app.status === 'Accepted' && app.studentId === 1);
  const internship = acceptedApp ? getInternship(acceptedApp.internshipId) : null;
  const company = internship ? getCompany(internship.companyId) : null;

  // Mock Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, text: "Attend orientation session", completed: true },
    { id: 2, text: "Complete project documentation", completed: false },
    { id: 3, text: "Submit weekly reports", completed: false },
    { id: 4, text: "Final presentation preparation", completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  if (!acceptedApp) {
    return (
      <Layout role="student">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-700">No accepted internship yet.</h2>
          <p className="text-gray-500 mt-2">Keep applying to open positions!</p>
          <Button 
             className="mt-6"
             onClick={() => window.location.href = '/student/internships'}
          >
            Browse Internships
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Internship</h1>
        <p className="text-gray-600">Track your progress and manage your active internship.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Header Card (Full Width) */}
        <div className="md:col-span-3">
          <Card className="border-l-4 border-green-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-gray-500 mr-4">
                   {company.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{internship.title}</h2>
                  <p className="text-lg text-gray-600">{company.name}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2"><StatusBadge status="Active" /></div>
                <p className="text-sm text-gray-500">Feb 01, 2026 - Aug 01, 2026</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Supervisor Card */}
        <div className="md:col-span-1">
          <Card title="Supervisor Info" className="h-full">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <FaUserTie className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Jane Smith</h4>
                <p className="text-xs text-gray-500 uppercase">Engineering Manager</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <FaEnvelope className="mr-3 text-gray-400" /> jane.smith@techcorp.com
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaPhone className="mr-3 text-gray-400" /> +234 801 234 5678
              </div>
            </div>

            <Button 
              className="w-full" 
              variant="secondary"
              onClick={() => window.open('mailto:jane.smith@techcorp.com')}
            >
              Contact Supervisor
            </Button>
          </Card>
        </div>

        {/* Tasks Card */}
        <div className="md:col-span-1">
          <Card title="Internship Tasks" className="h-full">
            <div className="mb-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-bold text-blue-600">{completedCount}/{tasks.length}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-3">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-50 ${task.completed ? 'opacity-50' : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? (
                    <FaCheckSquare className="text-green-500 mr-3 text-lg" />
                  ) : (
                    <FaRegSquare className="text-gray-400 mr-3 text-lg" />
                  )}
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Documents Card */}
        <div className="md:col-span-1">
          <Card title="Documents & Certs" className="h-full">
            <div className="text-center py-6">
              <FaCertificate className="text-6xl text-gray-300 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Completion Certificate</h4>
              
              {completedCount === tasks.length ? (
                <div className="mt-4">
                   <p className="text-sm text-green-600 mb-4">Certificate is ready!</p>
                   <Button 
                     className="w-full flex items-center justify-center"
                     onClick={() => window.open(require('../../assets/sample-certificate.pdf'), '_blank')}
                   >
                     <FaDownload className="mr-2" /> Download PDF
                   </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-4 px-4">
                    Complete all tasks to unlock your certificate of completion.
                  </p>
                  <Button disabled variant="secondary" className="w-full opacity-50 cursor-not-allowed">
                    Locked
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>
    </Layout>
  );
};

export default StudentAccepted;