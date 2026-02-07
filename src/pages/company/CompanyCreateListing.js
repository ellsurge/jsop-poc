import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import { FaSave, FaPaperPlane, FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const CompanyCreateListing = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDraftToast, setShowDraftToast] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    industry: 'Technology',
    location: 'Lagos',
    isRemote: false,
    duration: '24 weeks',
    slots: 1,
    startDate: '',
    deadline: '',
    description: '',
    responsibilities: '',
    requirements: '',
    stipend: '',
  });

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (currentSkill.trim()) {
        setSkills([...skills, currentSkill.trim()]);
        setCurrentSkill('');
        if (errors.skills) {
          setErrors({ ...errors, skills: null });
        }
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Position title is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (skills.length < 3) newErrors.skills = "At least 3 skills are required";
    
    if (formData.startDate && formData.deadline) {
      if (new Date(formData.deadline) >= new Date(formData.startDate)) {
        newErrors.deadline = "Deadline must be before start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (status) => {
    if (status === 'draft') {
      setShowDraftToast(true);
      setTimeout(() => setShowDraftToast(false), 3000);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <Layout role="company">
      {/* Toast Notification */}
      {showDraftToast && (
        <div className="fixed top-5 right-5 z-50 bg-gray-800 text-white px-6 py-3 rounded shadow-lg flex items-center animate-bounce">
          <FaCheckCircle className="mr-2 text-green-400" />
          Draft saved successfully!
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Internship Listing</h1>

        <div className="grid grid-cols-1 gap-6">
          
          {/* Section 1: Basic Information */}
          <Card title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Position Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 ${errors.title ? 'border-red-500' : ''}`}
                  placeholder="e.g. Frontend Developer Intern"
                />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Industry</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                >
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Manufacturing</option>
                  <option>Media</option>
                  <option>Construction</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  disabled={formData.isRemote}
                >
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Port Harcourt</option>
                  <option>Enugu</option>
                  <option>Ibadan</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="flex items-center md:col-span-2">
                <input
                  id="isRemote"
                  name="isRemote"
                  type="checkbox"
                  checked={formData.isRemote}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isRemote" className="ml-2 block text-sm text-gray-900">
                  This is a fully remote position
                </label>
              </div>
            </div>
          </Card>

          {/* Section 2: Duration & Capacity */}
          <Card title="Duration & Capacity">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                >
                  <option value="8 weeks">8 weeks</option>
                  <option value="12 weeks">12 weeks</option>
                  <option value="16 weeks">16 weeks</option>
                  <option value="24 weeks">24 weeks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Slots</label>
                <input
                  type="number"
                  name="slots"
                  min="1"
                  max="50"
                  value={formData.slots}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 ${errors.startDate ? 'border-red-500' : ''}`}
                />
                 {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Application Deadline <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 ${errors.deadline ? 'border-red-500' : ''}`}
                />
                {errors.deadline && <p className="mt-1 text-xs text-red-500">{errors.deadline}</p>}
              </div>
            </div>
          </Card>

          {/* Section 3: Job Details */}
          <Card title="Job Details">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Description <span className="text-red-500">*</span></label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe the role and what the intern will be doing..."
                />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Key Responsibilities</label>
                <textarea
                  name="responsibilities"
                  rows={4}
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  placeholder="List the main tasks and duties..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <textarea
                  name="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                  placeholder="List qualifications, skills, and experience needed..."
                />
              </div>
            </div>
          </Card>

          {/* Section 4: Skills & Compensation */}
          <Card title="Skills & Compensation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Required Skills <span className="text-red-500">*</span></label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={handleAddSkill}
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 border p-2"
                    placeholder="Type a skill and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-blue-100 text-blue-700">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                      >
                        <span className="sr-only">Remove skill</span>
                        <FaTimes size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
                <p className="mt-1 text-xs text-gray-500">Add at least 3 skills relevant to the role.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Stipend (Optional)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">NGN</span>
                  </div>
                  <input
                    type="number"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 sm:text-sm border-gray-300 rounded-md border p-2"
                    placeholder="0 if unpaid"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mb-8">
            <Button 
              variant="secondary" 
              onClick={() => handleSubmit('draft')}
              className="flex items-center"
            >
              <FaSave className="mr-2" /> Save as Draft
            </Button>
            <Button 
              variant="primary" 
              onClick={() => handleSubmit('submit')}
              disabled={isSubmitting}
              className="flex items-center min-w-[180px] justify-center"
            >
              {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : <FaPaperPlane className="mr-2" />}
              Submit for Approval
            </Button>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/company/dashboard');
        }}
        title="Success"
      >
        <div className="text-center py-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <FaCheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Listing Submitted!</h3>
          <p className="text-gray-500 mb-6">
            Your internship listing has been submitted for approval. The JSOP admin team will review it within 24 hours.
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/company/dashboard')}
              className="w-full"
            >
              View My Listings
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default CompanyCreateListing;