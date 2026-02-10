import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';

const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const roles = [
    { name: 'Student', path: '/student/dashboard', color: 'bg-blue-100 text-blue-800' },
    { name: 'Company', path: '/company/dashboard', color: 'bg-green-100 text-green-800' },
    { name: 'Admin', path: '/admin/dashboard', color: 'bg-purple-100 text-purple-800' },
  ];

  const currentRole = roles.find(r => r.name.toLowerCase() === role) || roles[0];

  return (
    <nav className="bg-white shadow z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <img className="h-8 w-auto mr-2" src="/project-logo.jpg" alt="JSOP Logo" />
              <h1 className="text-xl font-bold text-gray-800">JSOP Platform</h1>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-xs font-medium mr-4 ${currentRole.color}`}>
              {currentRole.name} View
            </span>
            
            <div className="ml-3 relative">
              <div>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center" 
                  id="user-menu" 
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <FaUserCircle className="h-8 w-8 text-gray-400" />
                  <FaChevronDown className="ml-1 h-3 w-3 text-gray-400" />
                </button>
              </div>
              
              {isMenuOpen && (
                <div 
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" 
                  role="menu" 
                  aria-orientation="vertical" 
                  aria-labelledby="user-menu"
                >
                  <div className="px-4 py-2 text-xs text-gray-500 border-b">Switch Role Demo</div>
                  {roles.map((r) => (
                    <button
                      key={r.name}
                      onClick={() => {
                        navigate(r.path);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {r.name}
                    </button>
                  ))}
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={() => navigate('/')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Back to Landing
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
