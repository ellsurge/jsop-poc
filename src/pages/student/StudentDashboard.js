import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { FaEdit, FaDownload, FaUpload, FaCheckCircle, FaTimes, FaPlus, FaLinkedin, FaGraduationCap, FaUser } from 'react-icons/fa';
import studentData from '../../data/students.json';

const StudentDashboard = () => {
  const [student] = useState(studentData[0]);
  const [skills, setSkills] = useState(student.skills);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleEditProfile = () => {
    alert("Feature coming soon: This will allow you to edit your profile details.");
  };

  return (
    <Layout role="student">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {student.name}</h1>
        <div className="mt-4 max-w-xl">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Profile Completion</span>
            <span>{student.completion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${student.completion}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Section 1: Personal Information */}
        <div className="md:col-span-2">
          <Card title="Personal Information" className="h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <div className="mt-1 text-gray-900 font-medium">{student.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email Address</label>
                <div className="mt-1 text-gray-900 font-medium">{student.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                <div className="mt-1 text-gray-900 font-medium">{student.phone}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                <div className="mt-1 text-gray-900 font-medium">{student.dob}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <div className="mt-1 text-gray-900 font-medium">{student.gender}</div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-500">Address</label>
                <div className="mt-1 text-gray-900 font-medium">{student.address}</div>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={handleEditProfile} variant="secondary" size="sm" className="flex items-center">
                <FaEdit className="mr-2" /> Edit Profile
              </Button>
            </div>
          </Card>
        </div>

        {/* Section 2: Education Details */}
        <div className="md:col-span-1">
          <Card title="Education" className="h-full">
            <div className="space-y-4">
              <div className="flex items-start">
                <FaGraduationCap className="text-gray-400 text-xl mt-1 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">{student.university}</h4>
                  <p className="text-gray-600 text-sm">{student.department}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Current Level</span>
                  <span className="font-medium text-gray-900">{student.level}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Matric Number</span>
                  <span className="font-medium text-gray-900">{student.matricNumber}</span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">CGPA</span>
                    <span className="font-bold text-blue-600">{student.cgpa} / 5.00</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full" 
                      style={{ width: `${(parseFloat(student.cgpa) / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Section 3: CV & Documents */}
        <div className="md:col-span-1">
          <Card title="Documents">
            <div className="bg-gray-50 rounded p-4 border border-gray-200 flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-3" />
                <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">{student.cvUrl}</span>
              </div>
              <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">Uploaded</span>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex-1 flex justify-center items-center"
                onClick={() => window.open(require('../../assets/sample-certificate.pdf'), '_blank')}
              >
                <FaDownload className="mr-2" /> Download
              </Button>
              <Button variant="primary" size="sm" className="flex-1 flex justify-center items-center">
                <FaUpload className="mr-2" /> Re-upload
              </Button>
            </div>
          </Card>
        </div>

        {/* Section 4: Skills */}
        <div className="md:col-span-1">
          <Card title="Skills">
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {skill}
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <FaTimes size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill..."
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button
                onClick={handleAddSkill}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
              >
                <FaPlus size={14} />
              </button>
            </div>
          </Card>
        </div>

        {/* Section 5: LinkedIn */}
        <div className="md:col-span-1">
          <Card title="Social Profiles">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <FaLinkedin className="text-blue-700 text-2xl mr-3" />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                  <a href={student.linkedin} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline truncate block">
                    {student.linkedin}
                  </a>
                </div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => handleEditProfile()}>
                Update
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </Layout>
  );
};

export default StudentDashboard;