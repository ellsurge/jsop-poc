import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBriefcase, FaFileAlt, FaCheckCircle, FaPlusCircle, FaChartLine, FaClipboardCheck, FaFileInvoice } from 'react-icons/fa';

const Sidebar = ({ role }) => {
  const getLinks = (role) => {
    switch(role) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/student/dashboard', icon: <FaHome /> },
          { name: 'Browse Internships', path: '/student/internships', icon: <FaBriefcase /> },
          { name: 'My Applications', path: '/student/applications', icon: <FaFileAlt /> },
          { name: 'Accepted', path: '/student/accepted', icon: <FaCheckCircle /> },
        ];
      case 'company':
        return [
          { name: 'Dashboard', path: '/company/dashboard', icon: <FaHome /> },
          { name: 'Create Listing', path: '/company/create', icon: <FaPlusCircle /> },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: <FaChartLine /> },
          { name: 'Approvals', path: '/admin/approvals', icon: <FaClipboardCheck /> },
          { name: 'Reports', path: '/admin/reports', icon: <FaFileInvoice /> },
        ];
      default:
        return [];
    }
  };

  const links = getLinks(role);

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col shadow-lg">
      <div className="h-16 flex items-center justify-center bg-gray-900 shadow-md">
        <span className="text-lg font-bold tracking-wider uppercase">{role} Portal</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => 
                  `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ${
                    isActive 
                      ? 'bg-gray-700 text-white border-r-4 border-blue-500' 
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="mr-3 text-lg">{link.icon}</span>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-gray-900">
        <p className="text-xs text-gray-500 text-center">© 2026 JSOP Platform</p>
      </div>
    </aside>
  );
};

export default Sidebar;
