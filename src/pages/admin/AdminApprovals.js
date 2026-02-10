import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Table from '../../components/shared/Table';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';
import Modal from '../../components/shared/Modal';
import { FaCheck, FaTimes, FaEye, FaCommentDots } from 'react-icons/fa';
import { toast } from 'react-toastify';
import pendingData from '../../data/pending.json';

const AdminApprovals = () => {
  const [activeTab, setActiveTab] = useState('Students');
  const [pending, setPending] = useState(pendingData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (type, id, name) => {
    if (window.confirm(`Approve ${name}?`)) {
      const typeKey = type.toLowerCase();
      setPending({
        ...pending,
        [typeKey]: pending[typeKey].filter(item => item.id !== id)
      });
      toast.success(`${type.slice(0, -1)} approved successfully!`);
    }
  };

  const handleReject = () => {
    const typeKey = activeTab.toLowerCase();
    setPending({
      ...pending,
      [typeKey]: pending[typeKey].filter(item => item.id !== selectedItem.id)
    });
    setIsRejectModalOpen(false);
    setSelectedItem(null);
    setRejectReason('');
    toast.error(`${activeTab.slice(0, -1)} application rejected.`);
  };

  const renderStudents = () => (
    <Table
      headers={['Name', 'Email', 'University', 'Department', 'Registered Date', 'Actions']}
      data={pending.students}
      renderRow={(student) => (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.university}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.department}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(student.registeredDate).toLocaleDateString()}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button onClick={() => { setSelectedItem(student); setIsDetailModalOpen(true); }} className="text-blue-600 hover:text-blue-900" title="View Details"><FaEye /></button>
            <button onClick={() => handleApprove('Students', student.id, student.name)} className="text-green-600 hover:text-green-900" title="Approve"><FaCheck /></button>
            <button onClick={() => { setSelectedItem(student); setIsRejectModalOpen(true); }} className="text-red-600 hover:text-red-900" title="Reject"><FaTimes /></button>
          </td>
        </>
      )}
    />
  );

  const renderCompanies = () => (
    <Table
      headers={['Company Name', 'Industry', 'RC Number', 'Contact Person', 'Registered Date', 'Actions']}
      data={pending.companies}
      renderRow={(company) => (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.industry}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.rcNumber}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.contactPerson}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(company.registeredDate).toLocaleDateString()}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button onClick={() => { setSelectedItem(company); setIsDetailModalOpen(true); }} className="text-blue-600 hover:text-blue-900" title="View Details"><FaEye /></button>
            <button onClick={() => handleApprove('Companies', company.id, company.name)} className="text-green-600 hover:text-green-900" title="Approve"><FaCheck /></button>
            <button onClick={() => { setSelectedItem(company); setIsRejectModalOpen(true); }} className="text-red-600 hover:text-red-900" title="Reject"><FaTimes /></button>
          </td>
        </>
      )}
    />
  );

  const renderListings = () => (
    <Table
      headers={['Position Title', 'Company', 'Location', 'Slots', 'Deadline', 'Actions']}
      data={pending.listings}
      renderRow={(listing) => (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{listing.title}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.company}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.location}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.slots}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(listing.deadline).toLocaleDateString()}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
            <button onClick={() => { setSelectedItem(listing); setIsDetailModalOpen(true); }} className="text-blue-600 hover:text-blue-900" title="View Details"><FaEye /></button>
            <button onClick={() => handleApprove('Listings', listing.id, listing.title)} className="text-green-600 hover:text-green-900" title="Approve"><FaCheck /></button>
            <button onClick={() => { setSelectedItem(listing); setIsRejectModalOpen(true); }} className="text-red-600 hover:text-red-900" title="Reject"><FaTimes /></button>
            <button onClick={() => toast.info('Request for changes sent.')} className="text-yellow-600 hover:text-yellow-900" title="Request Changes"><FaCommentDots /></button>
          </td>
        </>
      )}
    />
  );

  return (
    <Layout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Approvals</h1>
        <p className="text-gray-600">Review and approve new registrations and internship listings.</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['Students', 'Companies', 'Listings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab} ({pending[tab.toLowerCase()].length})
            </button>
          ))}
        </nav>
      </div>

      <Card className="overflow-hidden">
        {activeTab === 'Students' && renderStudents()}
        {activeTab === 'Companies' && renderCompanies()}
        {activeTab === 'Listings' && renderListings()}
      </Card>

      {/* Detail Modal */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title={`${activeTab.slice(0, -1)} Details`}>
        {selectedItem && (
          <div className="space-y-4">
             {activeTab === 'Students' && (
               <div className="grid grid-cols-2 gap-4 text-sm">
                 <div><span className="font-bold">Name:</span> {selectedItem.name}</div>
                 <div><span className="font-bold">Email:</span> {selectedItem.email}</div>
                 <div><span className="font-bold">University:</span> {selectedItem.university}</div>
                 <div><span className="font-bold">CGPA:</span> {selectedItem.cgpa}</div>
                 <div className="col-span-2"><span className="font-bold">Department:</span> {selectedItem.department}</div>
               </div>
             )}
             {activeTab === 'Companies' && (
               <div className="grid grid-cols-2 gap-4 text-sm">
                 <div><span className="font-bold">Company:</span> {selectedItem.name}</div>
                 <div><span className="font-bold">Industry:</span> {selectedItem.industry}</div>
                 <div><span className="font-bold">RC Number:</span> {selectedItem.rcNumber}</div>
                 <div><span className="font-bold">Contact:</span> {selectedItem.contactPerson}</div>
               </div>
             )}
             {activeTab === 'Listings' && (
               <div className="space-y-2 text-sm">
                 <div><span className="font-bold">Title:</span> {selectedItem.title}</div>
                 <div><span className="font-bold">Company:</span> {selectedItem.company}</div>
                 <div><span className="font-bold">Location:</span> {selectedItem.location}</div>
                 <div><span className="font-bold">Slots:</span> {selectedItem.slots}</div>
                 <div><span className="font-bold">Description:</span> {selectedItem.description}</div>
               </div>
             )}
             <div className="flex justify-end pt-4 border-t">
               <Button variant="secondary" onClick={() => setIsDetailModalOpen(false)}>Close</Button>
             </div>
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} title="Reason for Rejection">
        <div className="space-y-4">
          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={4}
            placeholder="Why is this being rejected?"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setIsRejectModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleReject}>Confirm Rejection</Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default AdminApprovals;