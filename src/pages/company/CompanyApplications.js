import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import Table from '../../components/shared/Table';
import StatusBadge from '../../components/shared/StatusBadge';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import { FaFileAlt, FaCheck, FaTimes, FaArrowLeft, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

import internshipData from '../../data/internships.json';
import applicationData from '../../data/applications.json';
import studentData from '../../data/students.json';

const CompanyApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = internshipData.find(i => i.id === parseInt(id));
  
  // Get applications for this specific listing
  const [applications, setApplications] = useState(
    applicationData.filter(app => app.internshipId === parseInt(id))
  );

  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to get student info
  const getStudent = (studentId) => {
    // In a real app this would fetch by ID, but we only have 1 mock student in json
    // simulating data for others if needed, but for now we just use the one mock
    return studentData.find(s => s.id === studentId) || {
      name: "Mock Student",
      email: "mock@student.com",
      cgpa: "3.5",
      university: "Mock University",
      cvUrl: "cv.pdf"
    };
  };

  const handleUpdateStatus = (appId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  const tableHeaders = ['Applicant Name', 'University', 'CGPA', 'Applied Date', 'Status', 'Actions'];

  const renderRow = (app) => {
    const student = getStudent(app.studentId);
    return (
      <>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <FaUser size={12} />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{student.name}</div>
              <div className="text-xs text-gray-500">{student.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.university}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{student.cgpa}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</td>
        <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={app.status} /></td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <Button size="sm" variant="secondary" onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}>
            Review
          </Button>
        </td>
      </>
    );
  };

  if (!listing) return <Layout role="company"><div>Listing not found</div></Layout>;

  return (
    <Layout role="company">
      <div className="mb-6">
        <button onClick={() => navigate('/company/dashboard')} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>
        <div className="flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-bold text-gray-900">Applications for {listing.title}</h1>
             <p className="text-gray-500">Manage candidates and hiring pipeline.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded border shadow-sm text-sm">
             <span className="font-bold text-gray-700">{listing.filled}</span> / {listing.slots} Slots Filled
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Table headers={tableHeaders} data={applications} renderRow={renderRow} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Review Application">
        {selectedApp && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
               <div className="flex items-center">
                 <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mr-4">
                    {getStudent(selectedApp.studentId).name.charAt(0)}
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-gray-900">{getStudent(selectedApp.studentId).name}</h3>
                   <p className="text-sm text-gray-500">{getStudent(selectedApp.studentId).university}</p>
                 </div>
               </div>
               <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{getStudent(selectedApp.studentId).cgpa}</div>
                  <div className="text-xs text-gray-500 uppercase">CGPA</div>
               </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase mb-2">Cover Letter</h4>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 italic border">
                  "{selectedApp.coverLetter}"
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-700 uppercase mb-2">Contact Info</h4>
                <div className="flex space-x-6 text-sm text-gray-600">
                  <span className="flex items-center"><FaEnvelope className="mr-2" /> {getStudent(selectedApp.studentId).email}</span>
                  <span className="flex items-center"><FaPhone className="mr-2" /> {getStudent(selectedApp.studentId).phone || "N/A"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-blue-50 p-3 rounded border border-blue-100">
                 <span className="flex items-center text-blue-800 font-medium">
                   <FaFileAlt className="mr-2" /> {getStudent(selectedApp.studentId).cvUrl}
                 </span>
                 <button className="text-xs bg-white border border-blue-200 text-blue-600 px-3 py-1 rounded hover:bg-blue-50">
                   View PDF
                 </button>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
              
              <div className="space-x-2">
                {selectedApp.status !== 'Rejected' && (
                   <Button variant="danger" onClick={() => { handleUpdateStatus(selectedApp.id, 'Rejected'); setIsModalOpen(false); }}>
                     <FaTimes className="mr-1 inline" /> Reject
                   </Button>
                )}
                {selectedApp.status !== 'Accepted' && (
                  <Button variant="primary" className="bg-green-600 hover:bg-green-700" onClick={() => { handleUpdateStatus(selectedApp.id, 'Accepted'); setIsModalOpen(false); }}>
                    <FaCheck className="mr-1 inline" /> Accept Candidate
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default CompanyApplications;