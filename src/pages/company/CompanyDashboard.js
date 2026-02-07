import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Card from '../../components/shared/Card';
import Table from '../../components/shared/Table';
import StatusBadge from '../../components/shared/StatusBadge';
import Button from '../../components/shared/Button';
import { FaPlus, FaEye, FaEdit, FaTrash, FaCheckCircle, FaHourglassHalf, FaUserFriends, FaClipboardList } from 'react-icons/fa';

import internshipData from '../../data/internships.json';
import companyData from '../../data/companies.json';
import applicationData from '../../data/applications.json';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  // Mock logged-in company as Tech Corp (ID 1)
  const companyId = 1;
  const company = companyData.find(c => c.id === companyId);
  const [listings, setListings] = useState(internshipData.filter(i => i.companyId === companyId));

  // Stats Logic
  const activeListingsCount = listings.filter(l => l.status === 'Active').length;
  // Get all internship IDs for this company
  const internshipIds = listings.map(l => l.id);
  // Filter applications for these internships
  const companyApplications = applicationData.filter(app => internshipIds.includes(app.internshipId));
  
  const totalApplications = companyApplications.length;
  const pendingReviews = companyApplications.filter(app => app.status === 'Submitted' || app.status === 'Under Review').length;
  const hiredStudents = companyApplications.filter(app => app.status === 'Accepted').length;

  const handleCloseListing = (id) => {
    if (window.confirm("Are you sure you want to close this listing? Candidates will no longer be able to apply.")) {
      setListings(listings.map(l => l.id === id ? { ...l, status: 'Closed' } : l));
    }
  };

  const handleEditListing = () => {
    alert("Feature coming soon: Edit Listing");
  };

  const tableHeaders = ['Position Title', 'Location', 'Slots', 'Applications', 'Deadline', 'Status', 'Actions'];

  const renderRow = (listing) => {
    const appCount = companyApplications.filter(app => app.internshipId === listing.id).length;
    const filledPercent = (listing.filled / listing.slots) * 100;

    return (
      <>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {listing.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {listing.location} ({listing.type})
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 min-w-[150px]">
          <div className="flex justify-between mb-1 text-xs">
            <span>{listing.filled}/{listing.slots} filled</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${filledPercent}%` }}></div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
          {appCount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(listing.deadline).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <StatusBadge status={listing.status} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-2">
            <button 
              onClick={() => navigate(`/company/applications/${listing.id}`)}
              className="text-blue-600 hover:text-blue-900" 
              title="View Applications"
            >
              <FaEye />
            </button>
            <button 
              onClick={handleEditListing} 
              className="text-indigo-600 hover:text-indigo-900"
              title="Edit Listing"
            >
              <FaEdit />
            </button>
            {listing.status === 'Active' && (
              <button 
                onClick={() => handleCloseListing(listing.id)} 
                className="text-red-600 hover:text-red-900"
                title="Close Listing"
              >
                <FaTrash />
              </button>
            )}
          </div>
        </td>
      </>
    );
  };

  return (
    <Layout role="company">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
           <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-gray-500 mr-4 border-2 border-white shadow-sm">
             {company.name.substring(0, 2).toUpperCase()}
           </div>
           <div>
             <h1 className="text-2xl font-bold text-gray-900">Welcome, {company.name}</h1>
             <p className="text-gray-500">Manage your internships and find the best talent.</p>
           </div>
        </div>
        <Button onClick={() => navigate('/company/create')}>
          <FaPlus className="mr-2 inline" /> Create New Listing
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-blue-500 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Active Listings</p>
            <p className="text-2xl font-bold text-gray-900">{activeListingsCount}</p>
          </div>
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <FaClipboardList />
          </div>
        </Card>
        
        <Card className="border-l-4 border-purple-500 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Total Applications</p>
            <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
          </div>
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <FaUserFriends />
          </div>
        </Card>

        <Card className="border-l-4 border-yellow-500 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Pending Reviews</p>
            <p className="text-2xl font-bold text-gray-900">{pendingReviews}</p>
          </div>
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <FaHourglassHalf />
          </div>
        </Card>

        <Card className="border-l-4 border-green-500 p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Hired Students</p>
            <p className="text-2xl font-bold text-gray-900">{hiredStudents}</p>
          </div>
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <FaCheckCircle />
          </div>
        </Card>
      </div>

      {/* Listings Table */}
      <Card title="My Listings" className="overflow-hidden">
        <Table 
          headers={tableHeaders} 
          data={listings} 
          renderRow={renderRow} 
        />
      </Card>
    </Layout>
  );
};

export default CompanyDashboard;