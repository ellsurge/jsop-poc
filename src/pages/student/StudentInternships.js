import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaSearch, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import internshipData from '../../data/internships.json';
import companyData from '../../data/companies.json';
import studentData from '../../data/students.json';

// Helper to get company details
const getCompany = (companyId) => companyData.find(c => c.id === companyId);
const student = studentData[0]; // Mock current logged-in student

const StudentInternships = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    industry: 'All',
    location: 'All',
    duration: 'All'
  });
  
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  // Application Form State
  const [coverLetter, setCoverLetter] = useState('');
  const [isCvConfirmed, setIsCvConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Filter Logic
  const filteredInternships = useMemo(() => {
    return internshipData.filter(internship => {
      const company = getCompany(internship.companyId);
      
      const matchesSearch = 
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesIndustry = filters.industry === 'All' || company.industry === filters.industry;
      const matchesLocation = filters.location === 'All' || internship.location === filters.location;
      
      // Simplified duration match logic (string match for demo)
      const matchesDuration = filters.duration === 'All' || internship.duration === filters.duration;

      return matchesSearch && matchesIndustry && matchesLocation && matchesDuration && internship.status === 'Active';
    });
  }, [searchTerm, filters]);

  const handleCardClick = (internship) => {
    setSelectedInternship(internship);
    setIsDetailModalOpen(true);
  };

  const handleOpenApplyModal = () => {
    setIsDetailModalOpen(false);
    setIsApplyModalOpen(true);
    setCoverLetter("I am excited to apply for this position because...");
    setIsCvConfirmed(false);
  };

  const handleSubmitApplication = () => {
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApplyModalOpen(false);
      setShowSuccessToast(true);
      
      // Redirect after showing toast for a moment
      setTimeout(() => {
        navigate('/student/applications');
      }, 1500);
    }, 1000);
  };

  return (
    <Layout role="student">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-3 rounded shadow-lg flex items-center animate-bounce">
          <FaCheckCircle className="mr-2" />
          Application submitted successfully!
        </div>
      )}

      {/* Header & Search */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Internships</h1>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          
          {/* Search Bar */}
          <div className="flex-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
              placeholder="Search by role or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:w-auto w-full">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={filters.industry}
              onChange={(e) => setFilters({...filters, industry: e.target.value})}
            >
              <option value="All">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Media">Media</option>
            </select>

            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            >
              <option value="All">All Locations</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Port Harcourt">Port Harcourt</option>
              <option value="Remote">Remote</option>
            </select>

            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={filters.duration}
              onChange={(e) => setFilters({...filters, duration: e.target.value})}
            >
              <option value="All">All Durations</option>
              <option value="8 weeks">8 weeks</option>
              <option value="12 weeks">12 weeks</option>
              <option value="16 weeks">16 weeks</option>
              <option value="24 weeks">24 weeks</option>
            </select>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          Showing {filteredInternships.length} internships
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map(internship => {
          const company = getCompany(internship.companyId);
          const percentFilled = (internship.filled / internship.slots) * 100;

          return (
            <Card key={internship.id} className="hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-blue-200">
              <div onClick={() => handleCardClick(internship)}>
                <div className="flex items-start justify-between mb-4">
                  {/* Placeholder for Logo - In real app, use <img> */}
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
                    {company.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {internship.type}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{internship.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{company.name}</p>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" /> {internship.location}
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-gray-400" /> {internship.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4 h-12 overflow-hidden">
                  {internship.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {skill}
                    </span>
                  ))}
                  {internship.skills.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500">
                      +{internship.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{internship.filled} / {internship.slots} filled</span>
                    <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${percentFilled}%` }}></div>
                  </div>
                </div>
                
                <Button className="w-full" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Internship Details"
      >
        {selectedInternship && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-start space-x-4 border-b pb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-gray-500">
                {getCompany(selectedInternship.companyId).name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedInternship.title}</h2>
                <p className="text-gray-600 font-medium">{getCompany(selectedInternship.companyId).name}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                   <span className="flex items-center"><FaMapMarkerAlt className="mr-1" /> {selectedInternship.location} ({selectedInternship.type})</span>
                   <span className="flex items-center"><FaBriefcase className="mr-1" /> {selectedInternship.industry}</span>
                </div>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="block text-xs text-gray-500 uppercase">Duration</span>
                <span className="font-semibold text-gray-900">{selectedInternship.duration}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase">Stipend</span>
                <span className="font-semibold text-gray-900">{selectedInternship.stipend || 'Unpaid'}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase">Deadline</span>
                <span className="font-semibold text-gray-900">{new Date(selectedInternship.deadline).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 uppercase">Slots</span>
                <span className="font-semibold text-gray-900">{selectedInternship.slots - selectedInternship.filled} available</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">About the Role</h3>
              <div className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedInternship.description }}></div>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Responsibilities</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {selectedInternship.responsibilities?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

             {/* Requirements */}
             <div>
              <h3 className="font-bold text-gray-900 mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {selectedInternship.requirements?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
               <h3 className="font-bold text-gray-900 mb-2">Required Skills</h3>
               <div className="flex flex-wrap gap-2">
                 {selectedInternship.skills.map((skill, idx) => (
                   <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                     {skill}
                   </span>
                 ))}
               </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="secondary" onClick={() => setIsDetailModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleOpenApplyModal}>
                Apply Now
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Application Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => !isSubmitting && setIsApplyModalOpen(false)}
        title={selectedInternship ? `Apply to ${selectedInternship.title}` : 'Apply'}
      >
        {selectedInternship && (
          <div className="space-y-6">
            {/* Header Info (Condensed) */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm font-bold text-gray-500">
                {getCompany(selectedInternship.companyId).name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-900">{getCompany(selectedInternship.companyId).name}</p>
                <p className="text-xs text-gray-500">{selectedInternship.location}</p>
              </div>
            </div>

            {/* Profile Summary Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm">
              <h4 className="font-semibold text-gray-700 mb-2 border-b pb-1">Your Profile Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <div><span className="font-medium text-gray-800">Name:</span> {student.name}</div>
                <div><span className="font-medium text-gray-800">CGPA:</span> {student.cgpa}</div>
                <div><span className="font-medium text-gray-800">University:</span> {student.university}</div>
                <div><span className="font-medium text-gray-800">Level:</span> {student.level}</div>
              </div>
              <div className="mt-2 flex items-center text-green-600 font-medium">
                <FaCheckCircle className="mr-1" /> Profile verified
              </div>
               <div className="mt-1 flex items-center text-gray-600 text-xs">
                <span className="font-medium mr-1">CV Attached:</span> {student.cvUrl}
              </div>
            </div>

            {/* Form Section */}
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter / Motivation
              </label>
              <textarea
                id="coverLetter"
                rows={8}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                placeholder="Why are you a good fit for this role?"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <div className="text-right text-xs text-gray-400 mt-1">
                {coverLetter.length} characters
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="confirmCv"
                name="confirmCv"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={isCvConfirmed}
                onChange={(e) => setIsCvConfirmed(e.target.checked)}
              />
              <label htmlFor="confirmCv" className="ml-2 block text-sm text-gray-900">
                I confirm my CV is up to date and accurate.
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button 
                variant="secondary" 
                onClick={() => setIsApplyModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitApplication}
                disabled={!isCvConfirmed || isSubmitting}
                className="min-w-[150px] flex justify-center"
              >
                {isSubmitting ? <FaSpinner className="animate-spin" /> : 'Submit Application'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default StudentInternships;