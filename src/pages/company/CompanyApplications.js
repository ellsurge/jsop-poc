import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import Table from '../../components/shared/Table';
import StatusBadge from '../../components/shared/StatusBadge';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import { FaFileAlt, FaCheck, FaTimes, FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaDownload, FaCheckCircle } from 'react-icons/fa';

import internshipData from '../../data/internships.json';
import applicationData from '../../data/applications.json';
import studentData from '../../data/students.json';

const CompanyApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = internshipData.find(i => i.id === parseInt(id));
  
  const [applications, setApplications] = useState(
    applicationData.filter(app => app.internshipId === parseInt(id))
  );

  const [filter, setFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Helper to get student info
  const getStudent = (studentId) => {
    return studentData.find(s => s.id === studentId) || {
      name: "Mock Student",
      email: "mock@student.com",
      phone: "+234 700 000 0000",
      cgpa: "3.5",
      university: "Mock University",
      department: "Engineering",
      level: "400 Level",
      skills: ["Problem Solving", "Teamwork"],
      cvUrl: "cv.pdf"
    };
  };

  const handleUpdateStatus = (appId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    
    const studentName = getStudent(applications.find(a => a.id === appId).studentId).name;
    
    if (newStatus === 'Accepted') {
      setShowToast({ message: `${studentName} accepted! Email notification sent (simulated)`, type: 'success' });
    } else if (newStatus === 'Rejected') {
      setShowToast({ message: `Application for ${studentName} rejected`, type: 'info' });
    }

    setTimeout(() => setShowToast(null), 3000);
  };

  const filteredApps = filter === 'All' 
    ? applications 
    : applications.filter(app => {
        if (filter === 'Pending') return ['Submitted', 'Under Review'].includes(app.status);
        return app.status === filter;
      });

  const tableHeaders = ['Student Name', 'University', 'Department', 'Level', 'CGPA', 'Applied Date', 'Status', 'Actions'];

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
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.university}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.department}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.level}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{student.cgpa}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</td>
        <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={app.status} /></td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-2">
            <Button size="sm" variant="secondary" onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}>
              View Profile
            </Button>
            {['Submitted', 'Under Review'].includes(app.status) && (
              <>
                <button 
                  onClick={() => {
                    if (window.confirm(`Accept ${getStudent(app.studentId).name} for this position?`)) {
                      handleUpdateStatus(app.id, 'Accepted');
                    }
                  }}
                  className="p-2 text-green-600 hover:bg-green-50 rounded"
                  title="Accept"
                >
                  <FaCheck />
                </button>
                <button 
                  onClick={() => {
                    setSelectedApp(app);
                    setIsRejectModalOpen(true);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Reject"
                >
                  <FaTimes />
                </button>
              </>
            )}
          </div>
        </td>
      </>
    );
  };

  if (!listing) return <Layout role="company"><div>Listing not found</div></Layout>;

  return (
    <Layout role="company">
      {showToast && (
        <div className={`fixed top-5 right-5 z-50 ${showToast.type === 'success' ? 'bg-green-500' : 'bg-blue-500'} text-white px-6 py-3 rounded shadow-lg flex items-center animate-pulse`}>
          <FaCheckCircle className="mr-2" />
          {showToast.message}
        </div>
      )}

      <div className="mb-6">
        <button onClick={() => navigate('/company/dashboard')} className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>
        <div className="flex justify-between items-end">
          <div>
             <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
             <p className="text-gray-500">Applications Management</p>
          </div>
          <div className="text-right space-y-1">
            <div className="bg-white px-4 py-2 rounded border shadow-sm text-sm inline-block">
               <span className="font-bold text-gray-700">{listing.filled}</span> / {listing.slots} Slots Filled
            </div>
            <p className="text-xs text-red-500 font-semibold">5 days remaining to deadline</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['All', 'Pending', 'Accepted', 'Rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${filter === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab} ({
                tab === 'All' ? applications.length : 
                tab === 'Pending' ? applications.filter(a => ['Submitted', 'Under Review'].includes(a.status)).length :
                applications.filter(a => a.status === tab).length
              })
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Table headers={tableHeaders} data={filteredApps} renderRow={renderRow} />
      </div>

      {/* View Profile Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Student Profile">
        {selectedApp && (
          <div className="max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
               <div className="flex items-center">
                 <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mr-4">
                    {getStudent(selectedApp.studentId).name.charAt(0)}
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-gray-900">{getStudent(selectedApp.studentId).name}</h3>
                   <div className="flex flex-col text-sm text-gray-500">
                     <span className="flex items-center"><FaEnvelope className="mr-2" /> {getStudent(selectedApp.studentId).email}</span>
                     <span className="flex items-center"><FaPhone className="mr-2" /> {getStudent(selectedApp.studentId).phone}</span>
                   </div>
                 </div>
               </div>
               <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{getStudent(selectedApp.studentId).cgpa}</div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">CGPA</div>
                  <div className="mt-2"><StatusBadge status={selectedApp.status} /></div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Education</h4>
                <p className="text-sm text-gray-900 font-semibold">{getStudent(selectedApp.studentId).university}</p>
                <p className="text-sm text-gray-600">{getStudent(selectedApp.studentId).department}</p>
                <p className="text-xs text-gray-500">{getStudent(selectedApp.studentId).level}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {getStudent(selectedApp.studentId).skills?.map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Cover Letter</h4>
                <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 italic border border-gray-100 whitespace-pre-wrap">
                  "{selectedApp.coverLetter}"
                </div>
              </div>

              <div className="flex items-center justify-between bg-blue-50 p-4 rounded border border-blue-100">
                 <div className="flex items-center">
                    <FaFileAlt className="text-blue-600 mr-3" size={24} />
                    <div>
                      <p className="text-sm font-bold text-blue-900">{getStudent(selectedApp.studentId).cvUrl}</p>
                      <p className="text-xs text-blue-700">Student Curriculum Vitae</p>
                    </div>
                 </div>
                 <Button size="sm" variant="secondary" className="bg-white border-blue-200 text-blue-600">
                   <FaDownload className="mr-2" /> Download
                 </Button>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
              
              {['Submitted', 'Under Review'].includes(selectedApp.status) && (
                <div className="space-x-2">
                   <Button variant="danger" onClick={() => { setIsModalOpen(false); setIsRejectModalOpen(true); }}>
                     Reject
                   </Button>
                   <Button variant="primary" className="bg-green-600 hover:bg-green-700" onClick={() => { 
                     if (window.confirm(`Accept ${getStudent(selectedApp.studentId).name} for this position?`)) {
                       handleUpdateStatus(selectedApp.id, 'Accepted'); 
                       setIsModalOpen(false); 
                     }
                   }}>
                     Accept Candidate
                   </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal 
        isOpen={isRejectModalOpen} 
        onClose={() => setIsRejectModalOpen(false)} 
        title="Reason for Rejection"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Provide feedback to help the student improve (optional).</p>
          <textarea
            className="w-full border rounded-md p-3 text-sm focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="e.g. While your skills are impressive, we are looking for someone with more experience in..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <div className="flex items-center">
            <input type="checkbox" defaultChecked className="rounded text-blue-600 mr-2" />
            <span className="text-xs text-gray-500">Send feedback to student via email</span>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setIsRejectModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { handleUpdateStatus(selectedApp.id, 'Rejected'); setIsRejectModalOpen(false); setRejectReason(''); }}>
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default CompanyApplications;