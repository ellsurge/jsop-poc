import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Table from '../../components/shared/Table';
import StatusBadge from '../../components/shared/StatusBadge';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Modal from '../../components/shared/Modal';
import { FaFileAlt, FaMapMarkerAlt, FaRegCalendarAlt, FaTimesCircle } from 'react-icons/fa';

import applicationData from '../../data/applications.json';
import internshipData from '../../data/internships.json';
import companyData from '../../data/companies.json';

// Helper functions for data joining
const getInternship = (id) => internshipData.find(i => i.id === id);
const getCompany = (id) => companyData.find(c => c.id === id);

const StudentApplications = () => {
  const [filter, setFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applications, setApplications] = useState(applicationData.filter(app => app.studentId === 1));

  // Derived Statistics
  const stats = {
    total: applications.length,
    submitted: applications.filter(a => a.status === 'Submitted').length,
    underReview: applications.filter(a => a.status === 'Under Review').length,
    accepted: applications.filter(a => a.status === 'Accepted').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
  };

  const filteredApplications = filter === 'All' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const handleWithdraw = () => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      const updatedApps = applications.map(app => 
        app.id === selectedApp.id ? { ...app, status: 'Withdrawn' } : app
      );
      setApplications(updatedApps);
      setIsModalOpen(false);
    }
  };

  const tableHeaders = ['Company', 'Position', 'Location', 'Applied Date', 'Status', 'Actions'];

  const renderRow = (app) => {
    const internship = getInternship(app.internshipId);
    const company = getCompany(internship.companyId);

    return (
      <>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500">
              {company.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{company.name}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {internship.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1 text-gray-400" /> {internship.location}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(app.appliedDate).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <StatusBadge status={app.status} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <Button size="sm" variant="secondary" onClick={() => handleViewDetails(app)}>
            View Details
          </Button>
        </td>
      </>
    );
  };

  return (
    <Layout role="student">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Applications</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="text-center p-4 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Total</div>
          </Card>
          <Card className="text-center p-4 border-l-4 border-blue-300">
            <div className="text-2xl font-bold text-gray-900">{stats.submitted}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Submitted</div>
          </Card>
          <Card className="text-center p-4 border-l-4 border-yellow-400">
            <div className="text-2xl font-bold text-gray-900">{stats.underReview}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">In Review</div>
          </Card>
          <Card className="text-center p-4 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-gray-900">{stats.accepted}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Accepted</div>
          </Card>
          <Card className="text-center p-4 border-l-4 border-red-500">
            <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Rejected</div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['All', 'Submitted', 'Under Review', 'Accepted', 'Rejected'].map((tab) => (
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
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Applications Table */}
        <Table 
          headers={tableHeaders} 
          data={filteredApplications} 
          renderRow={renderRow} 
        />
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Application Details"
      >
        {selectedApp && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-center space-x-3 border-b pb-4">
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-sm font-bold text-gray-500">
                {getCompany(getInternship(selectedApp.internshipId).companyId).name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{getInternship(selectedApp.internshipId).title}</h3>
                <p className="text-gray-600">{getCompany(getInternship(selectedApp.internshipId).companyId).name}</p>
              </div>
              <div className="ml-auto">
                <StatusBadge status={selectedApp.status} />
              </div>
            </div>

            {/* Application Timeline */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Timeline</h4>
              <div className="border-l-2 border-gray-200 ml-2 space-y-4">
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 bg-blue-500 h-3 w-3 rounded-full border-2 border-white"></div>
                  <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                  <p className="text-xs text-gray-500">{new Date(selectedApp.appliedDate).toLocaleString()}</p>
                </div>
                {selectedApp.reviewedDate && (
                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 bg-yellow-400 h-3 w-3 rounded-full border-2 border-white"></div>
                    <p className="text-sm font-medium text-gray-900">Under Review</p>
                    <p className="text-xs text-gray-500">{new Date(selectedApp.reviewedDate).toLocaleString()}</p>
                  </div>
                )}
                {selectedApp.acceptedDate && (
                  <div className="relative pl-6">
                    <div className="absolute -left-1.5 bg-green-500 h-3 w-3 rounded-full border-2 border-white"></div>
                    <p className="text-sm font-medium text-gray-900">Accepted</p>
                    <p className="text-xs text-gray-500">{new Date(selectedApp.acceptedDate).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <FaFileAlt className="mr-2 text-gray-500" /> Cover Letter
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 italic border border-gray-200">
                "{selectedApp.coverLetter}"
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end pt-4 border-t">
              {['Submitted', 'Under Review'].includes(selectedApp.status) && (
                <Button variant="danger" size="sm" onClick={handleWithdraw}>
                  <FaTimesCircle className="mr-2 inline" /> Withdraw Application
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default StudentApplications;